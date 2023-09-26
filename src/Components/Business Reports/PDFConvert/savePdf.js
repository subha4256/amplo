import domtoimage from "dom-to-image";

export const printDocument = (domId) => {
    document.getElementById("downLoad_button_PDF").style.display = "none";
    const input = document.getElementById(domId);
    domtoimage
        .toPng(input)
        .then(function (dataUrl) {
            const imgData = dataUrl;
            var image = new Image();
            image.src = imgData;

            image.onload = function () {
                let pageWidth = image.naturalWidth;
                let pageHeight = image.naturalHeight;

                // Create a new PDF with the same dimensions as the image.
                const pdf = new window.jsPDF({
                    orientation:
                        pageHeight > pageWidth ? "portrait" : "landscape",
                    unit: "px",
                    format: [pageHeight + 20, pageWidth + 10],
                });
                // Add the image to the PDF with dimensions equal to the internal dimensions of the page.
                pdf.addImage(
                    image,
                    5,
                    5,
                    pdf.internal.pageSize.width,
                    pdf.internal.pageSize.height
                );

                // Save the PDF with the filename specified here:
                pdf.save("report.pdf");
                document.getElementById("downLoad_button_PDF").style.display =
                    "block";
            };

        })
        .catch(function (error) {
            console.error("oops, something went wrong!", error);
        });
};
