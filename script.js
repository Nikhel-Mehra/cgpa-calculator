// Function to generate input fields for subjects, credits, and marks
function generateInputs() {
    const numberOfSubjects = parseInt(document.getElementById("numberOfSubjects").value);
    const subjectInputs = document.getElementById("subjectInputs");
    subjectInputs.innerHTML = ""; // Clear previous inputs if any

    for (let i = 1; i <= numberOfSubjects; i++) {
        const subjectHtml = `
            <div class="form-group">
                <label for="subjectName${i}">Subject ${i}:</label>
                <input type="text" id="subjectName${i}" placeholder="Enter subject name">
            </div>
            <div class="form-group">
                <label for="credits${i}">Credits:</label>
                <input type="number" id="credits${i}" placeholder="Enter credits">
            </div>
            <div class="form-group">
                <label for="marks${i}">Marks:</label>
                <input type="number" id="marks${i}" placeholder="Enter marks out of 100">
            </div>
        `;
        subjectInputs.insertAdjacentHTML('beforeend', subjectHtml);
    }

    const calculateButtonHtml = `
        <button id="calculateButton">Calculate CGPA</button>
    `;
    subjectInputs.insertAdjacentHTML('beforeend', calculateButtonHtml);

    document.getElementById("calculateButton").addEventListener("click", calculateCGPA);
}

// Function to calculate CGPA based on input data
function calculateCGPA() {
    const numberOfSubjects = parseInt(document.getElementById("numberOfSubjects").value);
    let totalCredits = 0;
    let weightedSum = 0;

    let subjectsData = [];

    for (let i = 1; i <= numberOfSubjects; i++) {
        const subjectName = document.getElementById(`subjectName${i}`).value;
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        const marks = parseFloat(document.getElementById(`marks${i}`).value);

        let grade;
        if (marks >= 91) grade = 10;
        else if (marks >= 81) grade = 9;
        else if (marks >= 71) grade = 8;
        else if (marks >= 61) grade = 7;
        else if (marks >= 51) grade = 6;
        else if (marks >= 41) grade = 5;
        else if (marks >= 33) grade = 4;
        else grade = 0;

        weightedSum += grade * credits;
        totalCredits += credits;

        subjectsData.push({ subjectName, credits, marks, grade });
    }

    const cgpa = (weightedSum / totalCredits).toFixed(2);
    document.getElementById("result").textContent = `Your CGPA is ${cgpa}`;

    // Add the download button
    const downloadButtonHtml = `<button id="downloadButton">Download Grade Card</button>`;
    document.getElementById("subjectInputs").insertAdjacentHTML('beforeend', downloadButtonHtml);

    // Attach the event listener for the download button
    document.getElementById("downloadButton").addEventListener("click", function () {
        generatePDF(subjectsData, cgpa);
    });
}

// Function to generate and download a grade card in PDF format
function generatePDF(subjectsData, cgpa) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const studentName = document.getElementById("studentName").value;
    const semester = document.getElementById("semester").value;

    // Setting up background color similar to the website
    doc.setFillColor(18, 18, 18);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

    // Title and header
    doc.setFontSize(18);
    doc.setTextColor(142, 45, 226); // Gradient color
    doc.text("Grade Card", 20, 20);

    // Student information
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White text
    doc.text(`Student Name: ${studentName}`, 20, 40);
    doc.text(`Semester: ${semester}`, 20, 50);

    // Table headers
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("S No.", 20, 70);
    doc.text("Subject Name", 40, 70);
    doc.text("Credits", 120, 70);
    doc.text("Grade", 160, 70);

    // Drawing the table content
    let yPosition = 80; // Initial y position for the table rows

    subjectsData.forEach((subject, index) => {
        doc.text(`${index + 1}`, 20, yPosition);
        doc.text(subject.subjectName, 40, yPosition);
        doc.text(`${subject.credits}`, 120, yPosition);
        doc.text(`${subject.grade}`, 160, yPosition);
        yPosition += 10; // Move to the next row
    });

    // Final CGPA result
    doc.setFontSize(14);
    doc.text(`Result: Your CGPA is ${cgpa}`, 20, yPosition + 20);

    // Footer design similar to website's button
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(142, 45, 226); // Gradient color
    doc.rect(20, doc.internal.pageSize.getHeight() - 30, doc.internal.pageSize.getWidth() - 40, 20, 'F');
    doc.text("Generated by CGPA Calculator", 20, doc.internal.pageSize.getHeight() - 15);

    doc.save(`${studentName}_GradeCard.pdf`);
}

// Event listener for the Next button to generate inputs dynamically
document.getElementById("nextButton").addEventListener("click", generateInputs);
