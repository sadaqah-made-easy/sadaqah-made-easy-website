import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FormData = {
  title: string;
  description: string;
  payment_info: string;
  date: string;
  image: string;
  referral_link: string;
  organizer: string;
  categories: string[];
  tags: string[];
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData: FormData = await req.json();
    const {
      title,
      description,
      payment_info,
      date,
      image,
      referral_link,
      organizer,
      categories,
      tags,
    } = formData;

    const formatTextToHTML = (text: string): string =>
      text
        .split("\n")
        .map((line) => `<p>${line.trim()}</p>`)
        .join("");

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: `New Form Submission: ${title}`,
      html: `
        <h2>You have a new project request:</h2>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <th>Title</th>
            <th>Project Will End</th>
            <th>Image URL</th>
            <th>Organization</th>
            <th>Referral Link</th>
            <th>Categories</th>
            <th>Tags</th>
            <th>Payment Info</th>
          </tr>
          <tr>
            <td>${title}</td>
            <td>${date}</td>
            <td><a href="${image}" target="_blank">View Image</a></td>
            <td>${organizer}</td>
            <td><a href="${referral_link}" target="_blank">View Link</a></td>
            <td>${categories.join(", ")}</td>
            <td>${tags.join(", ")}</td>
            <td>${formatTextToHTML(payment_info)}</td>
          </tr>
        </table>

        <h3>Project Description</h3>

        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td>${formatTextToHTML(description)}</td>
          </tr>

        </table>
      `,
    };

    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Project request submitted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending project request:", error);
    return NextResponse.json(
      { message: "Error sending project request!" },
      { status: 500 },
    );
  }
}
