document.getElementById("nextButton").addEventListener("click", function () {
    const studentName = document.getElementById("studentName").value;
    const semester = document.getElementById("semester").value;
    const numberOfSubjects = document.getElementById("numberOfSubjects").value;

    if (studentName && semester && numberOfSubjects) {
        generateInputs(numberOfSubjects);
    } else {
        alert("Please fill out all the fields.");
    }
});

function generateInputs(numberOfSubjects) {
    const subjectInputs = document.getElementById("subjectInputs");
    subjectInputs.innerHTML = ""; // Clear previous inputs if any

    for (let i = 1; i <= numberOfSubjects; i++) {
        const subjectHtml = `
            <div class="form-group">
                <label for="subjectName${i}">Subject ${i} Name:</label>
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

function calculateCGPA() {
    const numberOfSubjects = document.getElementById("numberOfSubjects").value;
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 1; i <= numberOfSubjects; i++) {
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        const marks = parseFloat(document.getElementById(`marks${i}`).value);

        if (!credits || !marks) {
            alert(`Please enter valid credits and marks for Subject ${i}.`);
            return;
        }

        const grade = calculateGrade(marks);
        totalCredits += credits;
        totalPoints += credits * grade;
    }

    const cgpa = totalPoints / totalCredits;
    displayResult(cgpa.toFixed(2));
}

function calculateGrade(marks) {
    if (marks >= 91) return 10;
    if (marks >= 81) return 9;
    if (marks >= 71) return 8;
    if (marks >= 61) return 7;
    if (marks >= 51) return 6;
    if (marks >= 41) return 5;
    return 0;
}

function displayResult(cgpa) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Your CGPA is: ${cgpa}`;

    // Create PDF grade card
    generatePDF(cgpa);
}

function generatePDF(cgpa) {
    const studentName = document.getElementById("studentName").value;
    const semester = document.getElementById("semester").value;
    const numberOfSubjects = document.getElementById("numberOfSubjects").value;
    
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Grade Card", 105, 20, null, null, "center");
    doc.setFontSize(16);
    doc.text(`Name: ${studentName}`, 20, 40);
    doc.text(`Semester: ${semester}`, 20, 50);
    doc.text(`Number of Subjects: ${numberOfSubjects}`, 20, 60);
    doc.text(`CGPA: ${cgpa}`, 20, 70);

    for (let i = 1; i <= numberOfSubjects; i++) {
        const subjectName = document.getElementById(`subjectName${i}`).value;
        const credits = document.getElementById(`credits${i}`).value;
        const marks = document.getElementById(`marks${i}`).value;
        const grade = calculateGrade(parseFloat(marks));

        doc.text(`Subject ${i}: ${subjectName}`, 20, 80 + i * 10);
        doc.text(`Credits: ${credits}, Marks: ${marks}, Grade: ${grade}`, 20, 90 + i * 10);
    }

    doc.save("GradeCard.pdf");
}
