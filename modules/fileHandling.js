// modules/fileHandling.js
// Module 12: File Handling & Large File Management
// Stores and organizes multiple files submitted for one order. The system can
// traverse the list to check each file's name, size, type, and status while
// flagging missing, corrupted, or large files before printing. Files are kept
// in a list and paired with the order status flow: Pending, Printing,
// Completed, and Cancelled. File metadata is stored in memory for now - swap
// it for database/storage calls later.

import { ORDER_CHANNELS } from '../constants.js';

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const LARGE_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];

function isKnownChannel(fileChannel) {
  for (const key in ORDER_CHANNELS) {
    if (ORDER_CHANNELS[key] === fileChannel) return true;
  }
  return false;
}

/** Returns the file-submission fields shared with the Order schema. */
function getFileSubmissionDetails(order = {}) {
  const fileChannel = isKnownChannel(order.fileChannel)
    ? order.fileChannel
    : ORDER_CHANNELS.IN_PERSON;
  return {
    orderId: order.orderId || null,
    fileName: order.fileName || '',
    fileChannel,
    fileCount: Number(order.fileCount) || 0,
    notes: order.notes || ''
  };
}

/**
 * Checks a browser File object or a file metadata object.
 * @param {File|Object|null} file
 * @returns {{valid: boolean, isLarge: boolean, message: string}}
 */
function validateFile(file) {
  if (!file) {
    return {
      valid: true,
      isLarge: false,
      message: 'No upload attached.'
    };
  }

  const fileSize = Number(file.size) || 0;
  const fileType = file.type || '';
  const fileName = file.name || '';

  const extensionIsAllowed =
    /\.(pdf|doc|docx|jpg|jpeg|png)$/i.test(fileName);

  let typeIsAllowed = !fileType;
  for (let index = 0; index < ALLOWED_FILE_TYPES.length; index += 1) {
    if (ALLOWED_FILE_TYPES[index] === fileType) typeIsAllowed = true;
  }

  if (!extensionIsAllowed || !typeIsAllowed) {
    return {
      valid: false,
      isLarge: false,
      message: 'Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are accepted.'
    };
  }

  if (fileSize === 0) {
    return {
      valid: false,
      isLarge: false,
      message: 'This file is empty or cannot be processed. Please upload the file again.'
    };
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      isLarge: true,
      message: 'This file is over the 25 MB limit.'
    };
  }

  return {
    valid: true,
    isLarge:
      fileSize >= LARGE_FILE_SIZE_BYTES,
    message:
      fileSize >= LARGE_FILE_SIZE_BYTES
        ? 'Large file accepted for managed processing.'
        : 'File is ready.'
  };
}

/**
 * Organizes a group of files in the order staff expect to print them.
 * Numeric names are sorted naturally, so Part-2.pdf comes before Part-10.pdf.
 * @param {Array|FileList} files - the 10-15 files submitted for one order
 * @returns {Array} files sorted by filename
 */
function organizeFiles(files = []) {
  const organizedFiles = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    if (!file) continue;
    const fileName = file.name || '';
    let insertAt = organizedFiles.length;
    for (let organizedIndex = 0; organizedIndex < organizedFiles.length; organizedIndex += 1) {
      const organizedName = organizedFiles[organizedIndex].name || '';
      if (fileName.localeCompare(organizedName, undefined, { numeric: true, sensitivity: 'base' }) < 0) {
        insertAt = organizedIndex;
        break;
      }
    }
    for (let shiftIndex = organizedFiles.length; shiftIndex > insertAt; shiftIndex -= 1) {
      organizedFiles[shiftIndex] = organizedFiles[shiftIndex - 1];
    }
    organizedFiles[insertAt] = file;
  }
  return organizedFiles;
}

/**
 * Validates all files in one customer submission before printing begins.
 * @param {Array|FileList} files - submitted files
 * @param {number|null} expectedFileCount - expected count when known
 * @returns {{files: Array, validFiles: Array, invalidFiles: Array, missingCount: number, duplicateNames: Array, readyToPrint: boolean, message: string}}
 */
function validateFileBatch(files = [], expectedFileCount = null) {
  const organizedFiles = organizeFiles(files);
  const invalidFiles = [];
  const validFiles = [];
  const names = [];
  const duplicateNames = [];
  for (let index = 0; index < organizedFiles.length; index += 1) {
    const file = organizedFiles[index];
    const result = validateFile(file);
    if (result.valid) validFiles[validFiles.length] = file;
    else invalidFiles[invalidFiles.length] = result;

    const name = (file.name || '').toLowerCase();
    if (!name) continue;
    let alreadySeen = false;
    for (let nameIndex = 0; nameIndex < names.length; nameIndex += 1) {
      if (names[nameIndex] === name) alreadySeen = true;
    }
    if (alreadySeen) {
      let alreadyDuplicate = false;
      for (let duplicateIndex = 0; duplicateIndex < duplicateNames.length; duplicateIndex += 1) {
        if (duplicateNames[duplicateIndex] === name) alreadyDuplicate = true;
      }
      if (!alreadyDuplicate) duplicateNames[duplicateNames.length] = name;
    }
    names[names.length] = name;
  }
  const missingCount = expectedFileCount === null
    ? 0
    : Math.max(0, Number(expectedFileCount) - organizedFiles.length);
  const readyToPrint = missingCount === 0 && invalidFiles.length === 0 && duplicateNames.length === 0;

  let message = 'All submitted files are ready to print.';
  if (missingCount > 0) message = `${missingCount} file(s) are missing from this submission.`;
  else if (invalidFiles.length > 0) message = `${invalidFiles.length} file(s) are missing, corrupted, or invalid.`;
  else if (duplicateNames.length > 0) message = 'Duplicate filenames need to be checked before printing.';

  return {
    files: organizedFiles,
    validFiles,
    invalidFiles,
    missingCount,
    duplicateNames,
    readyToPrint,
    message
  };
}

/**
 * Creates download metadata for staff or a future storage service.
 * Browser File objects can be downloaded using the returned object URL.
 * @param {File|Object} file
 * @returns {{fileName: string, fileSize: string, downloadUrl: string|null}}
 */
function getDownloadInfo(file) {
  if (!file) return { fileName: '', fileSize: '0 B', downloadUrl: null };
  const downloadUrl = typeof URL !== 'undefined' && typeof Blob !== 'undefined' && file instanceof Blob
    ? URL.createObjectURL(file)
    : null;
  return {
    fileName: file.name || 'unnamed-file',
    fileSize: formatFileSize(file.size),
    downloadUrl
  };
}

/** Returns a human-readable size for staff-facing upload messages. */
function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** unitIndex).toFixed(unitIndex ? 1 : 0)} ${units[unitIndex]}`;
}

/** Test/configuration helper used by a future upload service. */
function getFileLimits() {
  return { maxFileSizeBytes: MAX_FILE_SIZE_BYTES, largeFileSizeBytes: LARGE_FILE_SIZE_BYTES };
}

export {
  validateFile,
  organizeFiles,
  validateFileBatch,
  getFileSubmissionDetails,
  getDownloadInfo,
  formatFileSize,
  getFileLimits
};
