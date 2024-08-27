function generateInputs() {
    const numSubjects = document.getElementById('numSubjects').value;
    const subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = ''; // Clear previous inputs if any
    for (let i = 0; i < numSubjects; i++) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-input';
        subjectDiv.innerHTML = `
            <label>Subject ${i + 1} Name:</label>
            <input type="text" class="subjectName" placeholder="Enter subject name"><br>
            <label>Credits:</label>
            <input type="number" class="credits" min="1" placeholder="Enter credits"><br>
            <label>Marks:</label>
            <input type="number" class="marks" min="0" max="100" placeholder="Enter marks"><br>
        `;
        subjectsContainer.appendChild(subjectDiv);
    }
    document.getElementById('subjectDetails').style.display = 'block';
}

function calculateCGPA() {
    const credits = document.getElementsByClassName('credits');
    const marks = document.getElementsByClassName('marks');
    const subjectNames = document.getElementsByClassName('subjectName');
    let totalCredits = 0;
    let weightedSum = 0;
    let gradeCardData = [];

    for (let i = 0; i < credits.length; i++) {
        const credit = parseFloat(credits[i].value);
        const mark = parseFloat(marks[i].value);
        let grade;

        if (mark >= 91) grade = 10;
        else if (mark >= 81) grade = 9;
        else if (mark >= 71) grade = 8;
        else if (mark >= 61) grade = 7;
        else if (mark >= 51) grade = 6;
        else if (mark >= 41) grade = 5;
        else if (mark >= 31) grade = 4;
        else grade = 0;

        weightedSum += grade * credit;
        totalCredits += credit;

        gradeCardData.push({
            subject: subjectNames[i].value,
            credit: credit,
            marks: mark,
            grade: grade
        });
    }

    const cgpa = weightedSum / totalCredits;
    document.getElementById('cgpaResult').innerText = `Your CGPA is: ${cgpa.toFixed(2)}`;
    document.getElementById('cgpaResult').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';

    // Store the grade card data globally for use in download
    window.gradeCardData = gradeCardData;
}

function downloadGradeCard() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const studentName = document.getElementById('studentName').value;
    const semester = document.getElementById('semester').value;

    doc.setFontSize(18);
    doc.text('Grade Card', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Name: ${studentName}`, 20, 40);
    doc.text(`Semester: ${semester}`, 20, 50);

    let startY = 70;
    window.gradeCardData.forEach((item, index) => {
        doc.text(`Subject ${index + 1}: ${item.subject}`, 20, startY);
        doc.text(`Credits: ${item.credit}`, 120, startY);
        doc.text(`Marks: ${item.marks}`, 20, startY + 10);
        doc.text(`Grade: ${item.grade}`, 120, startY + 10);
        startY += 20;
    });

    const cgpa = document.getElementById('cgpaResult').innerText.split(': ')[1];
    doc.text(`CGPA: ${cgpa}`, 20, startY + 10);

    doc.save('GradeCard.pdf');
}
