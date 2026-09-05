// modules/fileHandling.js
// Module 12: File Handling & Large File Management
// Stores and organizes multiple files submitted for one order. The system can
// traverse the list to check each file's name, size, type, and status, while
// flagging missing, corrupted, or large files before printing. File metadata
// is stored in memory for now - swap it for database/storage calls later.

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const LARGE_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

/**
 * Checks a browser File object or a file metadata object.
 * @param {File|Object|null} file
 * @returns {{valid: boolean, isLarge: boolean, message: string}}
 */
function validateFile(file) {
  if (!file) return { valid: true, isLarge: false, message: 'No upload attached.' };

  const fileSize = Number(file.size) || 0;
  const fileType = file.type || '';
  const fileName = file.name || '';
  const extensionIsAllowed = /\.(pdf|doc|docx)$/i.test(fileName);
  const typeIsAllowed = !fileType || ALLOWED_FILE_TYPES.includes(fileType);

  if (!extensionIsAllowed || !typeIsAllowed) {
    return { valid: false, isLarge: false, message: 'Only PDF, DOC, and DOCX files are accepted.' };
  }
  if (file.corrupted || file.isCorrupted || file.error || fileSize === 0) {
    return { valid: false, isLarge: false, message: 'This file is missing or corrupted and must be uploaded again.' };
  }
  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return { valid: false, isLarge: true, message: 'This file is over the 25 MB limit.' };
  }

  return {
    valid: true,
    isLarge: fileSize >= LARGE_FILE_SIZE_BYTES,
    message: fileSize >= LARGE_FILE_SIZE_BYTES ? 'Large file accepted for managed processing.' : 'File is ready.'
  };
}

/**
 * Organizes a group of files in the order staff expect to print them.
 * Numeric names are sorted naturally, so Part-2.pdf comes before Part-10.pdf.
 * @param {Array|FileList} files - the 10-15 files submitted for one order
 * @returns {Array} files sorted by filename
 */
function organizeFiles(files = []) {
  return Array.from(files)
    .filter(Boolean)
    .sort((first, second) => (first.name || '').localeCompare(second.name || '', undefined, { numeric: true, sensitivity: 'base' }));
}

/**
 * Validates all files in one customer submission before printing begins.
 * @param {Array|FileList} files - submitted files
 * @param {number|null} expectedFileCount - expected count when known
 * @returns {{files: Array, validFiles: Array, invalidFiles: Array, missingCount: number, duplicateNames: Array, readyToPrint: boolean, message: string}}
 */
function validateFileBatch(files = [], expectedFileCount = null) {
  const organizedFiles = organizeFiles(files);
  const results = organizedFiles.map((file) => ({ file, ...validateFile(file) }));
  const invalidFiles = results.filter((result) => !result.valid);
  const validFiles = results.filter((result) => result.valid).map((result) => result.file);
  const names = organizedFiles.map((file) => (file.name || '').toLowerCase());
  const duplicateNames = [...new Set(names.filter((name, index) => name && names.indexOf(name) !== index))];
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
  getDownloadInfo,
  formatFileSize,
  getFileLimits
};
