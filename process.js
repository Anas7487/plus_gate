var input = document.getElementById("inputable");

async function process() {
    // Clear the table before inserting new rows
    var table = document.getElementById("truth_table");
    var rowCount = table.rows.length;

    // Remove all rows except the header
    while (rowCount > 1) {
        table.deleteRow(1);
        rowCount--;
    }

    let A = parseInt(document.getElementById('num1').value).toString(2);
    let B = parseInt(document.getElementById('num2').value).toString(2);

    // Ensure both A and B are 6 bits long by padding with zeros
    if (A.length > B.length) {
        A = A.padStart(A.length + 1, '0');
        B = B.padStart(A.length + 1, '0');
    } else {
        A = A.padStart(B.length + 1, '0');
        B = B.padStart(B.length + 1, '0');
    }

    // Reverse the strings
    A = A.split('').reverse().join('');
    B = B.split('').reverse().join('');

    let Cin = 0;
    let resultBits = [];
    let A_len = A.length;

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (let i = 0; i < A_len; i++) {
        allWhite();
        if (Cin === 1) { CinGreen(); } else { Cinred(); }
        await delay(300);

        let Apos = parseInt(A[i]);
        if (Apos === 1) { AGreen(); } else { Ared(); }

        let Bpos = parseInt(B[i]);
        if (Bpos === 1) { BGreen(); } else { Bred(); }
        await delay(200);

        let xor_one = Apos ^ Bpos;
        if (xor_one === 1) { xorGreen(); } else { xorred(); }
        await delay(200);

        let S = xor_one ^ Cin;
        if (S === 1) { SGreen(); } else { Sred(); }
        await delay(200);

        let and_one = Apos & Bpos;
        if (and_one === 1) { and_oneGreen(); } else { and_onered(); }
        await delay(200);

        let and_two = Bpos & Cin;
        if (and_two === 1) { and_twoGreen(); } else { and_twored(); }
        await delay(200);

        let or = (and_one | and_two);
        if (or === 1) { orGreen(); } else { orred(); }
        await delay(200);

        let and_tree = Apos & Cin;
        if (and_tree === 1) { and_treeGreen(); } else { and_treered(); }
        await delay(200);

        let Cout = (or | and_tree); // Carry out
        if (Cout === 1) { CoutGreen(); } else { Coutred(); }
        await delay(200);

        Cin = Cout; // Carry in for the next iteration

        resultBits.push(S);

        let outputBits = resultBits.join('');
        let outputNumber = parseInt(outputBits, 2);
        document.getElementById('output_bit').value = outputBits;
        document.getElementById('output_number').value = outputNumber;

        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = Apos;
        cell2.innerHTML = Bpos;
        cell3.innerHTML = S;
        cell4.innerHTML = Cin;
        cell5.innerHTML = Cout;
    }

    if (Cin === 1) {
        console.log('1');
    }

    // Reversing the result back and converting to number
    let outputBits = resultBits.reverse().join('');
    let outputNumber = parseInt(outputBits, 2);
    document.getElementById('output_bit').value = outputBits;
    document.getElementById('output_number').value = outputNumber;
}

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        process();
    }
});

function rt_convert() {
    let A = parseInt(document.getElementById('num1').value).toString(2);
    let B = parseInt(document.getElementById('num2').value).toString(2);

    document.getElementById('bit1').value = A.split('').reverse().join('');
    document.getElementById('bit2').value = B.split('').reverse().join('');
}

input.addEventListener("keyup", rt_convert);
