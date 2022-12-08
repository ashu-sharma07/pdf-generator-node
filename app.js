import ejs from "ejs";
import path from "path";
import fs from "fs-extra";
import puppeteer from "puppeteer";
import { nanoid } from "nanoid";

const complile = async (template, data) => {
  const filePath = path.join(process.cwd(), "views", `${template}.ejs`);
  const html = fs.readFileSync(filePath, "utf-8");
  return ejs.compile(html)(data);
};

const invoice = {
  id: "asldkaslk",
  created: "January 10, 2023",
  due: "January 25, 2023",
  company: "Codeshot Ventures Pvt Ltd.",
  name: "Yash Kumar",
  email: "pathkumar2019@gmail.com",
};

const createPDF = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await complile("list", { invoice });
    const pdfPath = "./PDF/" + nanoid() + ".pdf";
    await page.setContent(content);
    await page.emulateMediaFeatures("screen");
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });
    browser.close();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

createPDF();
