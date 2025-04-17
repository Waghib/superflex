import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";

function CourseFeedbackPage() {
  const [elemContent, setElemContent] = useState(null);

  useEffect(() => {
    const targetElement = document.querySelector(
      ".m-grid.m-grid--hor.m-grid--root.m-page"
    );

    if (targetElement) {
      // Apply styling and DOM modifications before removing the element
      applyCustomStyling(targetElement);

      setElemContent(targetElement.innerHTML);
      targetElement.remove();
    }
  }, []);

  const applyCustomStyling = (element) => {
    // Keep track of style elements we add
    const addedStyles = [];

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
    // Mark as our custom style
    styleElement.setAttribute("data-custom-style", "true");
    document.head.appendChild(styleElement);
    addedStyles.push(styleElement);

    // Style alert messages
    const alertElements = element.querySelectorAll(".m-alert");
    alertElements.forEach((alertElement) => {
      alertElement.classList.add(
        "!bg-black",
        "!text-white",
        "!border-white/10",
        "!font-bold",
        "!p-4",
        "!rounded-3xl",
        "!flex",
        "!justify-between",
        "!items-center",
        "!m-6"
      );

      // Style alert icon
      const iconElement = alertElement.querySelector(".m-alert__icon");
      if (iconElement) {
        iconElement.classList.add(
          "!text-white",
          "!text-2xl",
          "!bg-x",
          "!rounded-full",
          "!p-2",
          "!w-12",
          "!h-12",
          "!flex",
          "!items-center",
          "!justify-center"
        );

        // Replace icon with SVG
        const createSvgIcon = (path) => {
          const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          svg.setAttribute("width", "24");
          svg.setAttribute("height", "24");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2");
          svg.setAttribute("stroke-linecap", "round");
          svg.setAttribute("stroke-linejoin", "round");
          svg.classList.add("w-6", "h-6", "text-white");

          const pathElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          pathElement.setAttribute("d", path);
          svg.appendChild(pathElement);

          return svg;
        };

        // Icon path for warning alert
        const iconPath = "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
        iconElement.innerHTML = "";
        iconElement.appendChild(createSvgIcon(iconPath));
      }

      // Style close button
      const closeButton = alertElement.querySelector("button.close");
      if (closeButton) {
        closeButton.style.cssText = "content: none !important;";

        const style = document.createElement("style");
        style.textContent =
          'button.close[data-dismiss="alert"]::before, button.close[data-dismiss="modal"]::before { display: none !important; content: none !important; }';
        style.setAttribute("data-custom-style", "true");
        document.head.appendChild(style);
        addedStyles.push(style);

        closeButton.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                `;
        closeButton.classList.add("!focus:outline-none");
      }

      // Style alert text
      const alertText = alertElement.querySelector(".m-alert__text");
      if (alertText) {
        alertText.classList.add("!text-white/90", "!ml-4");

        // Style the strong element
        const strongElement = alertText.querySelector("strong");
        if (strongElement) {
          strongElement.classList.add("!text-x");
        }
      }
    });

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

      // Remove unnecessary classes
      portlet.classList.remove(
        "m-portlet--primary",
        "m-portlet--head-solid-bg",
        "m-portlet--border-bottom-info",
        "m-portlet--head-sm"
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
        headingText.classList.add("!text-white", "!text-xl", "!font-bold");
      }

      // Style the portlet head caption
      const headCaption = portletHead.querySelector(".m-portlet__head-caption");
      if (headCaption) {
        headCaption.classList.add("!flex", "!justify-center", "!items-center");
      }
    }

    // Style the portlet body
    const portletBody = element.querySelector(".m-portlet__body");
    if (portletBody) {
      portletBody.classList.add(
        "!bg-black",
        "!rounded-b-3xl",
        "!p-0",
        "!border",
        "!border-white/10",
        "!shadow-lg",
        "!text-white",
        "!h-[calc(100vh-220px)]",
        "!max-h-[800px]",
        "!overflow-y-auto",
        "custom-scrollbar"
      );

      // Style section content
      const sectionContent = portletBody.querySelector(".m-section__content");
      if (sectionContent) {
        sectionContent.style.marginBottom = "0";
      }
    }

    // Style the table
    const table = element.querySelector(".table");
    if (table) {
      table.querySelectorAll('.table td, .table th').forEach(el => {
        el.classList.add('!border-none');
      });
      // Create a container for the table with modern styling
      const tableContainer = document.createElement("div");
      tableContainer.className =
        "overflow-hidden mb-6";
      table.parentNode.insertBefore(tableContainer, table);
      tableContainer.appendChild(table);

      // Style the table
      table.classList.add("!w-full", "!border-collapse", "!border-0");
      table.classList.remove(
        "m-table",
        "m-table--head-bg-metal",
        "table-responsive"
      );

      // Style the table headers
      const thead = table.querySelector("thead");
      if (thead) {
        thead.classList.add("!bg-zinc-900", "!sticky", "!top-0", "!z-10");

        const headers = thead.querySelectorAll("th");
        headers.forEach((header) => {
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
      const tbody = table.querySelector("tbody");
      if (tbody) {
        tbody.classList.add("!divide-y", "!divide-white/10");

        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row) => {
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

            // Style success text
            if (cell.classList.contains("text-success")) {
              cell.classList.remove("text-success");
              cell.classList.add("!text-emerald-400");
            }

            // Ensure last column is visible even if empty
            if (index === cells.length - 1) {
              cell.classList.add("!min-w-[80px]");

              // If empty, add a placeholder or visual indicator
              if (!cell.textContent.trim()) {
                // Add a subtle dash to indicate empty cell
                const dash = document.createElement("span");
                dash.textContent = "-";
                dash.classList.add("text-white/30");
                cell.appendChild(dash);
              }
            }
          });
        });
      }

      // Fix header columns to match data columns
      const headers = table.querySelectorAll("thead th");
      if (headers.length > 0) {
        // Ensure the last header column is properly styled
        const lastHeader = headers[headers.length - 1];
        lastHeader.classList.add("!min-w-[80px]");
      }
    }
  };

  return (
    <PageLayout currentPage={window.location.pathname}>
      {elemContent && (
        <div
          className="m-grid m-grid--hor m-grid--root m-page"
          dangerouslySetInnerHTML={{ __html: elemContent }}
        />
      )}
    </PageLayout>
  );
}

export default CourseFeedbackPage;
