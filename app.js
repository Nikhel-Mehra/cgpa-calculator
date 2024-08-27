function generateInputs() {
    const numSubjects = document.getElementById('numSubjects').value;
    const subjectInputs = document.getElementById('subjectInputs');
    subjectInputs.innerHTML = '';  // Clear previous inputs

    for (let i = 1; i <= numSubjects; i++) {
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
        subjectInputs.innerHTML += subjectHtml;
    }
    
    document.getElementById('calculateBtn').style.display = 'block';
}

function calculateCGPA() {
    const numSubjects = document.getElementById('numSubjects').value;
    let totalCredits = 0;
    let weightedSum = 0;

    for (let i = 1; i <= numSubjects; i++) {
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        const marks = parseFloat(document.getElementById(`marks${i}`).value);
        let grade;

        if (marks >= 91) grade = 10;
        else if (marks >= 81) grade = 9;
        else if (marks >= 71) grade = 8;
        else if (marks >= 61) grade = 7;
        else if (marks >= 51) grade = 6;
        else if (marks >= 41) grade = 5;
        else grade = 0;

        weightedSum += grade * credits;
        totalCredits += credits;
    }

    const cgpa = weightedSum / totalCredits;
    document.getElementById('result').innerText = `Your CGPA is: ${cgpa.toFixed(2)}`;
}
