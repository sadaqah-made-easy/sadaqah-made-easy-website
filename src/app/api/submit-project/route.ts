import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FormData = {
  title: string;
  description: string;
  date: string;
  image: string;
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
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData: FormData = await req.json();
    const { title, description, date, image, organizer, categories, tags } =
      formData;

    const formattedDescription = description
      .split("\n")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");

    const mailOptions = {
      from: "murad.themefisher@gmail.com",
      to: "murad.themefisher@gmail.com",
      subject: `New Form Submission: ${title}`,
      html: `
        <p>You have a new project request:</p>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Image URL</th>
            <th>Organization Reference Type</th>
            <th>Categories</th>
            <th>Tags</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>${title}</td>
            <td>${date}</td>
            <td><a href="${image}" target="_blank">View Image</a></td>
            <td>${organizer}</td>
            <td>${categories.join(", ")}</td>
            <td>${tags.join(", ")}</td>
            <td>${formattedDescription}</td>
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
