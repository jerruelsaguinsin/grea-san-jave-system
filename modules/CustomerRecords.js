
        function addCustomer() {

            document.getElementById("customer-modal").hidden = false;

            document.getElementById("name").focus();

        }


        function closeCustomerModal() {

            document.getElementById("customer-modal").hidden = true;

            clearForm();

        }


        function clearForm() {

            document.getElementById("name").value = "";
            document.getElementById("contact").value = "";
            document.getElementById("email").value = "";
            document.getElementById("date").value = "";
            document.getElementById("notes").value = "";

        }


        function saveCustomer() {

            var name =
                document.getElementById("name").value.trim();

            var contact =
                document.getElementById("contact").value.trim();

            var email =
                document.getElementById("email").value.trim();

            var date =
                document.getElementById("date").value;

            var notes =
                document.getElementById("notes").value.trim();


            /* VALIDATION */

            if (name === "") {

                alert("Please enter customer name.");

                return;

            }


            if (
                !email.match(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                )
            ) {

                alert("Please enter a valid email address.");

                return;

            }


            if (!contact.match(/^[0-9]{10,11}$/)) {

                alert("Please enter a valid contact number.");

                return;

            }


            /* TABLE */

            var tableBody =
                document.getElementById("customer-table-body");


            /* Remove empty message */

            var emptyRow =
                document.getElementById("empty-row");

            if (emptyRow) {

                emptyRow.remove();

            }


            /* Create row */

            var row =
                tableBody.insertRow();


            /* Customer ID */

            var idCell =
                row.insertCell(0);

            var customerCount =
                tableBody.rows.length;

            idCell.className = "id-cell";

            idCell.textContent =
                "CUS-" +
                String(customerCount).padStart(3, "0");


            /* Customer Name */

            var nameCell =
                row.insertCell(1);

            nameCell.textContent =
                name;


            /* Contact */

            var contactCell =
                row.insertCell(2);

            contactCell.textContent =
                contact;


            /* Email */

            var emailCell =
                row.insertCell(3);

            emailCell.textContent =
                email;


            /* Date */

            var dateCell =
                row.insertCell(4);

            dateCell.textContent =
                date || "-";


            /* Notes */

            var notesCell =
                row.insertCell(5);

            notesCell.textContent =
                notes || "-";


            /* Actions */

            var actionsCell =
                row.insertCell(6);

            actionsCell.className =
                "row-actions";


            actionsCell.innerHTML = `

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteCustomer(this)">
                    Delete
                </button>

            `;


            /* Close */

            closeCustomerModal();

        }


        function deleteCustomer(button) {

            var row =
                button.closest("tr");

            row.remove();


            /* Show empty message again */

            var tableBody =
                document.getElementById("customer-table-body");


            if (tableBody.rows.length === 0) {

                tableBody.innerHTML = `

                    <tr class="empty-row" id="empty-row">

                        <td colspan="7">
                            No customer records yet.
                            Click "Add Customer Record" to create one.
                        </td>

                    </tr>

                `;

            }

        }


        /* Close modal when clicking outside */

        document
            .getElementById("customer-modal")
            .addEventListener("click", function(event) {

                if (event.target === this) {

                    closeCustomerModal();

                }

            });


        /* ESC closes modal */

        document.addEventListener("keydown", function(event) {

            if (
                event.key === "Escape" &&
                !document.getElementById("customer-modal").hidden
            ) {

                closeCustomerModal();

            }

        });
