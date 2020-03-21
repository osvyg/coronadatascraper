import needle from "needle";
import pdf from 'pdfreader'
import fs from 'fs';

export const pdfDownload = async url => {
    let pdfText = "";
    if (url !== "") {
        const pdfReader = pdf.PdfReader;
        const response = await needle('get', url);
        const bodyResponse = response.body;
        if (!bodyResponse) {
            return null;
        }

        fs.writeFileSync('hola.pdf', bodyResponse);

        let i = 0;
        await new pdfReader().parseFileItems('hola.pdf', function (err, item) {
            console.log(i++);
            if (item && item.text) {
                fs.writeFileSync('hola2.html', item.text)
            }
        });
        return pdfText;
    }
};
