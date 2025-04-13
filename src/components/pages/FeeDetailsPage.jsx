import React, { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';

function FeeDetailsPage() {
    const [elemContent, setElemContent] = useState(null);

    useEffect(() => {
        const targetElement = document.querySelector(".m-grid.m-grid--hor.m-grid--root.m-page");

        if (targetElement) {
            // Apply styling and DOM modifications before removing the element
            applyCustomStyling(targetElement);

            setElemContent(targetElement.innerHTML);
            targetElement.remove();
        }
    }, []);

    const applyCustomStyling = (element) => {
        // Style the portlet container
        const portlet = element.querySelector(".m-portlet");
        if (portlet) {
            portlet.classList.add(
                "!bg-black",
                "!border-none",
                "!rounded-3xl",
                "!p-4",
                "!shadow-lg"
            );
        }



        // Style the portlet head
        const portletHead = element.querySelector(".m-portlet__head");
        if (portletHead) {
            portletHead.classList.add(
                "!bg-black",
                "!border",
                "!border-white/10",
                "!rounded-t-3xl",
                "!h-fit",
                "!p-4",
                "!flex",
                "!items-center",
                "!justify-between",
                "!mb-4"
            );

            // Find and style the heading
            const headingText = portletHead.querySelector(".m-portlet__head-text");
            if (headingText) {
                headingText.classList.add(
                    "!text-white",
                    "!text-xl",
                    "!font-bold"
                );
                headingText.innerHTML = 'Fee Collection Details';
            }
        }

        // Style the portlet body
        const portletBody = element.querySelector(".m-portlet__body");
        if (portletBody) {
            portletBody.classList.add(
                "!bg-black",
                "!rounded-b-3xl",
                "!p-6",
                "!border",
                "!border-white/10",
                "!shadow-lg",
                "!text-white",
                "!h-[calc(100vh-220px)]",
                "!max-h-[800px]",
                "!overflow-y-auto",
                "custom-scrollbar"
            );
        }

        // Add custom scrollbar styling
        const styleElement = document.createElement("style");
        styleElement.textContent = `
            .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        `;
        document.head.appendChild(styleElement);

        // Style the semester header sections
        const semesterHeaders = element.querySelectorAll("[id^='rowStdDetailHeader_']");
        semesterHeaders.forEach(header => {
            const row = header.querySelector('.row');
            if (row) {
                row.classList.add(
                    "!bg-zinc-900/50",
                    "!rounded-xl",
                    "!p-4",
                    "!border",
                    "!border-white/10",
                    "!mb-4",
                    "!flex",
                    "!items-center"
                );
            }

            // Add flex to col-lg-3 elements
            const colDiv = header.querySelector('.col-lg-3');
            if (colDiv) {
                colDiv.classList.add("!flex", "!items-center");
            }

            // Style the expand/collapse buttons
            const expandBtn = header.querySelector("[id^='BtnhideshowInternal']");
            if (expandBtn) {
                expandBtn.classList.remove(
                    "btn-brand",
                    "m-btn",
                    "m-btn--custom",
                    "m-btn--icon",
                    "m-btn--pill",
                    "m-btn--air"
                );
                expandBtn.classList.add(
                    "!bg-x",
                    "!rounded-lg",
                    "!w-8",
                    "!h-8",
                    "!flex",
                    "!items-center",
                    "!justify-center",
                    "!mr-2",
                    "!border-none",
                    "!shadow-lg",
                    "!transition-all",
                    "!duration-300",
                    "!p-0"
                );

                // Add animation for rotation on click
                expandBtn.addEventListener('click', function () {
                    const icon = this.querySelector('i');
                    const targetId = this.getAttribute('onclick').match(/ftn_ShowHideDivandData\((\d+)/)[1];
                    const targetDiv = document.getElementById(`rowStdDetail_${targetId}`);

                    if (targetDiv.style.display === 'none') {
                        icon.classList.remove('fa-angle-right');
                        icon.classList.add('fa-angle-down');
                    } else {
                        icon.classList.remove('fa-angle-down');
                        icon.classList.add('fa-angle-right');
                    }
                });
            }

            // Style semester labels
            const semesterLabel = header.querySelector('label');
            if (semesterLabel) {
                semesterLabel.classList.add(
                    "!text-white",
                    "!font-medium",
                    "!text-lg",
                    "!mb-0"
                );
            }

            // Style the amount text cells
            const amountCells = header.querySelectorAll("p.text-center");
            amountCells.forEach((cell, index) => {
                cell.classList.add(
                    "!text-white/80",
                    "!font-medium"
                );

                // Style based on content
                const amount = parseFloat(cell.textContent.replace(/[(),%]/g, ''));
                if (!isNaN(amount)) {
                    // Highlight collection amount (typically the 5th column)
                    if (index === 4) {
                        cell.classList.add("!text-emerald-400", "!font-bold");
                    }

                    // Highlight balance (typically the 6th column)
                    if (index === 5) {
                        if (amount < 0) {
                            cell.classList.add("!text-rose-400");
                        } else if (amount > 0) {
                            cell.classList.add("!text-amber-400");
                        }
                    }

                    // Highlight arrears (typically the 1st column)
                    if (index === 0 && amount < 0) {
                        cell.classList.add("!text-rose-400");
                    }
                }
            });
        });

        // Add null checks to prevent errors if elements don't exist
        const sampleStdFeeDetail = document.getElementById("sample_StdFeeDetail");
        if (sampleStdFeeDetail) {
            sampleStdFeeDetail.classList.add("!p-6");
        }

        const sumhead = document.getElementById("rowStdDetailHeaderRow_0");
        if (sumhead) {
            sumhead.classList.add("!p-2", "!bg-white/10", "!mb-2");
        }

        // Style the semester detail sections
        const semesterDetails = element.querySelectorAll("[id^='rowStdDetail_']");
        semesterDetails.forEach(detail => {
            detail.classList.add(
                "!mt-2",
                "!mb-6",
                "!rounded-xl",
                "!overflow-hidden"
            );

            // Improve Fee Details Row Layout - convert from side-by-side to column layout
            const feeDetailsRow = detail.querySelector('.row');
            if (feeDetailsRow) {
                // Change row to column flex layout with full width
                feeDetailsRow.classList.add('!flex', '!flex-col', '!w-full', '!gap-6');
                feeDetailsRow.classList.remove('row');

                // Make both sections full width
                const feeInSemesterCol = feeDetailsRow.querySelector('.col-lg-5');
                const registrationLogCol = feeDetailsRow.querySelector('.col-lg-7');

                if (feeInSemesterCol) {
                    feeInSemesterCol.classList.remove('col-lg-5');
                    feeInSemesterCol.classList.add('!w-full');

                    // Style Fee In Semester section
                    const feeInSemesterHeader = feeInSemesterCol.querySelector('h4');
                    if (feeInSemesterHeader) {
                        feeInSemesterHeader.classList.add('!text-xl', '!font-bold', '!text-white', '!mb-3');
                    }

                    // Improve layout of fee breakdown container
                    const feeBreakdownContainer = feeInSemesterCol.querySelector('.border.border-secondary');
                    if (feeBreakdownContainer) {
                        feeBreakdownContainer.classList.remove('border', 'border-secondary');
                        feeBreakdownContainer.classList.add(
                            '!bg-zinc-900/40',
                            '!rounded-xl',
                            '!p-5',
                            '!border',
                            '!border-white/10'
                        );
                    }

                    // Improve layout of fee items
                    const feeItems = feeInSemesterCol.querySelectorAll('.row');
                    feeItems.forEach(row => {
                        row.classList.add('!flex', '!justify-between', '!items-center', '!mb-3');

                        // Style labels and values
                        const labels = row.querySelectorAll('label');
                        labels.forEach(label => {
                            label.removeAttribute('style');
                            label.classList.add('!text-white/80', '!font-medium');

                            // Style section letters (A, B, C, etc.)
                            const boldText = label.querySelector('b');
                            if (boldText && boldText.textContent.match(/[A-G]\)/)) {
                                boldText.classList.add('!text-x', '!font-bold', '!mr-1');
                            }
                        });
                    });

                    // Style fee breakdown lists
                    const feeLists = feeInSemesterCol.querySelectorAll('ul');
                    feeLists.forEach(list => {
                        list.classList.add('!pl-6', '!mt-1', '!mb-3', '!text-white/70');

                        const listItems = list.querySelectorAll('li');
                        listItems.forEach(item => {
                            item.classList.add('!mb-1');

                            // Make the amounts bold
                            const boldAmount = item.querySelector('b');
                            if (boldAmount) {
                                boldAmount.classList.add('!text-white', '!font-medium');
                            }
                        });
                    });
                }

                if (registrationLogCol) {
                    registrationLogCol.classList.remove('col-lg-7');
                    registrationLogCol.classList.add('!w-full');

                    // Style Registration Log section
                    const regLogHeader = registrationLogCol.querySelector('h4');
                    if (regLogHeader) {
                        regLogHeader.classList.add('!text-xl', '!font-bold', '!text-white', '!mb-3');
                    }

                    // Style the hr elements
                    const hrElements = registrationLogCol.querySelectorAll('hr');
                    hrElements.forEach(hr => {
                        hr.classList.add('!border-white/10', '!mb-4');
                    });

                    // Improve GPA display
                    const gpaRows = registrationLogCol.querySelectorAll('.row:not(:last-child)');
                    gpaRows.forEach(row => {
                        row.classList.add('!flex', '!items-center', '!mb-2');

                        const labels = row.querySelectorAll('label');
                        labels.forEach((label, index) => {
                            label.removeAttribute('style');
                            if (index === 0) {
                                label.classList.add('!text-white/70', '!font-medium', '!mr-2', '!min-w-[50px]');
                            } else {
                                label.classList.add('!text-white', '!font-bold');
                            }
                        });
                    });

                    // Style installment section
                    const installmentHeader = registrationLogCol.querySelector('#lbIsntallmentHead_0');
                    if (installmentHeader) {
                        installmentHeader.classList.add('!text-lg', '!font-bold', '!text-white', '!mt-4', '!mb-3');
                    }
                }
            }

            // Style the Fee In Semester and Registration Log sections
            const sectionHeadings = detail.querySelectorAll("h4");
            sectionHeadings.forEach(heading => {
                heading.classList.add(
                    "!text-white",
                    "!font-bold",
                    "!text-lg",
                    "!mb-2"
                );
            });

            // Style border containers
            const borderContainers = detail.querySelectorAll(".border.border-secondary");
            borderContainers.forEach(container => {
                container.classList.remove("border", "border-secondary");
                container.classList.add(
                    "!border",
                    "!border-white/10",
                    "!rounded-xl",
                    "!p-4",
                    "!bg-zinc-900/30",
                    "!mb-4"
                );
            });

            // Style labels
            detail.querySelectorAll("label").forEach(label => {
                label.classList.add("!text-white/80");

                // Style the section labels (A, B, C, etc.)
                if (label.textContent.includes(")")) {
                    const boldText = label.querySelector("b");
                    if (boldText) {
                        boldText.classList.add("!text-x", "!font-bold");
                    }
                }
            });

            // Style tables inside the detail section
            const tables = detail.querySelectorAll("table");
            tables.forEach(table => {
                table.classList.add(
                    "!w-full",
                    "!border-collapse",
                    "!rounded-lg",
                    "!overflow-hidden",
                    "!border",
                    "!border-white/10",
                    "!mb-4"
                );

                // Remove bootstrap classes
                table.classList.remove(
                    "table-responsive",
                    "m-table--border-info",
                    "m-table--head-bg-info"
                );

                // Style table headers
                const thead = table.querySelector("thead");
                if (thead) {
                    thead.classList.add("!bg-zinc-900");

                    const headerRows = thead.querySelectorAll("tr");
                    headerRows.forEach(row => {
                        row.removeAttribute("style");
                        row.classList.add("!border-b", "!border-white/10");

                        const headerCells = row.querySelectorAll("th");
                        headerCells.forEach(cell => {
                            cell.removeAttribute("style");
                            cell.classList.add(
                                "!text-gray-400",
                                "!font-medium",
                                "!p-3",
                                "!text-left",
                                "!bg-transparent"
                            );
                        });
                    });
                }

                // Style table body
                const tbody = table.querySelector("tbody");
                if (tbody) {
                    tbody.classList.add("!divide-y", "!divide-white/10");

                    const rows = tbody.querySelectorAll("tr");
                    rows.forEach(row => {
                        row.classList.add(
                            "!bg-black",
                            "!hover:bg-white/5",
                            "!transition-colors"
                        );

                        const cells = row.querySelectorAll("td");
                        cells.forEach(cell => {
                            cell.classList.add(
                                "!p-3",
                                "!text-white/80",
                                "!border-y",
                                "!border-white/10"
                            );
                        });
                    });
                }
            });
        });

        // Style the main collection detail table
        const collectionTable = element.querySelector("#sample_CollectionDetail");
        if (collectionTable) {
            // Create a container for the table with modern styling
            const tableContainer = document.createElement("div");
            tableContainer.className = "rounded-xl overflow-hidden !border !border-white/10 mb-6";
            collectionTable.parentNode.insertBefore(tableContainer, collectionTable);
            tableContainer.appendChild(collectionTable);

            // Style the table
            collectionTable.classList.add(
                "!w-full",
                "!border-collapse",
                "!border-0"
            );
            collectionTable.classList.remove("table-bordered", "table-responsive");

            // Style the table headers
            const thead = collectionTable.querySelector("thead");
            if (thead) {
                thead.classList.add("!bg-zinc-900", "!sticky", "!top-0", "!z-10");

                const headers = thead.querySelectorAll("th");
                headers.forEach(header => {
                    header.classList.add(
                        "!bg-transparent",
                        "!text-gray-400",
                        "!font-medium",
                        "!p-3",
                        "!text-left",
                        "!border-b",
                        "!border-white/10"
                    );
                });
            }

            // Style the table body
            const tbody = collectionTable.querySelector("tbody");
            if (tbody) {
                tbody.classList.add("!divide-y", "!divide-white/10");

                const rows = tbody.querySelectorAll("tr");
                rows.forEach(row => {
                    row.classList.add(
                        "!bg-black",
                        "!hover:bg-white/5",
                        "!transition-colors"
                    );

                    const cells = row.querySelectorAll("td");
                    cells.forEach((cell, index) => {
                        cell.classList.add(
                            "!p-3",
                            "!text-white/80",
                            "!border-y",
                            "!border-white/10"
                        );

                        // Style amount column (typically the 6th column)
                        if (index === 5) {
                            cell.classList.add("!font-medium", "!text-emerald-400");
                        }

                        // Style status column (typically the 10th column)
                        if (index === 9) {
                            const status = cell.textContent.trim();
                            cell.innerHTML = `<span class="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md font-medium">${status}</span>`;
                        }

                        // Style date columns (due date and payment date)
                        if (index === 6 || index === 7) {
                            cell.classList.add("!text-blue-400");
                        }

                        // Style the remarks link
                        if (index === 10) {
                            const link = cell.querySelector("a");
                            if (link) {
                                link.removeAttribute("style");
                                link.classList.add(
                                    "!text-x",
                                    "!font-medium",
                                    "!hover:text-x/80",
                                    "!transition-colors",
                                    "!cursor-pointer"
                                );
                            }
                        }
                    });
                });
            }
        }

        // Add a summary card at the top
        const summaryContainer = document.createElement("div");
        summaryContainer.className = "bg-zinc-900 rounded-2xl p-6 mb-6 !border !border-white/10";

        // Calculate total paid
        let totalPaid = 0;
        const paymentAmounts = element.querySelectorAll("#sample_CollectionDetail tbody tr td:nth-child(6)");
        paymentAmounts.forEach(cell => {
            const amount = parseFloat(cell.textContent.replace(/[^0-9.-]+/g, ""));
            if (!isNaN(amount)) {
                totalPaid += amount;
            }
        });

        // Find the latest payment
        const latestPaymentRow = element.querySelector("#sample_CollectionDetail tbody tr");
        let latestPaymentInfo = "";
        if (latestPaymentRow) {
            const semester = latestPaymentRow.querySelector("td:nth-child(2)")?.textContent || "";
            const amount = latestPaymentRow.querySelector("td:nth-child(6)")?.textContent || "";
            const date = latestPaymentRow.querySelector("td:nth-child(8)")?.textContent || "";

            latestPaymentInfo = `
                <div class="mt-4 pt-4 !border-t !border-white/10">
                    <h4 class="text-sm font-medium text-white/70 mb-2">Latest Payment</h4>
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="block text-white font-medium">${semester}</span>
                            <span class="text-sm text-white/70">${date}</span>
                        </div>
                        <span class="text-lg font-bold text-emerald-400">${amount}</span>
                    </div>
                </div>
            `;
        }

        summaryContainer.innerHTML = `
            <div class="flex flex-col md:flex-row justify-between items-start gap-4">
                <div class="flex items-start gap-4">
                    <div class="h-12 w-12 rounded-xl bg-x flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                            <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">Fee Payment Summary</h3>
                        <p class="text-sm text-white/70 mt-1">Showing all fee transactions</p>
                    </div>
                </div>
                <div class="bg-black rounded-xl px-6 py-3 !border !border-white/10 text-center w-full md:w-auto">
                    <span class="block text-xs text-white/70 mb-1">Total Paid</span>
                    <span class="text-2xl font-bold text-emerald-400">Rs. ${totalPaid.toLocaleString()}</span>
                </div>
            </div>
            ${latestPaymentInfo}
        `;

        // Insert at the top of the portlet body
        if (portletBody && portletBody.firstChild) {
            portletBody.insertBefore(summaryContainer, portletBody.firstChild);
        }
    };

    return (
        <PageLayout currentPage={window.location.pathname}>
            {elemContent && (
                <div className="m-grid m-grid--hor m-grid--root m-page"
                    dangerouslySetInnerHTML={{ __html: elemContent }} />
            )}
        </PageLayout>
    );
}

export default FeeDetailsPage;
