const ExcelJS = require('exceljs');
import { expect, test } from "@playwright/test";

async function writeExcel(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

function readExcel(worksheet, searchText) {
    let output = { row: 0, column: 0 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}


test("Upload Download Excel Validation", async ({ page }) => {

    const textSearch = "Apple";
    const updateText = "400";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    // Start waiting for download event before clicking. This prevents missing the download event
    const downloadPromise = page.waitForEvent('download');

    await page.getByRole("button", { name: "Download" }).click();
    
    // Capture downloaded file object
    const download = await downloadPromise;

    // Get actual downloaded file path from Playwright temp folder
    const filePath = await download.path();

    console.log(filePath);


    // Update Excel file data using custom utility method
    writeExcel(textSearch, updateText, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole("row").filter({ has: textLocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateText);


})