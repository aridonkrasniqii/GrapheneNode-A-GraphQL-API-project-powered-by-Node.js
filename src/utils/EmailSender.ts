import nodemailer, { Transporter, TransportOptions } from 'nodemailer';
interface MailOptions {
	from: string;
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export class EmailService {
	static sendEmail = (options: MailOptions) => {
		const transporter: Transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			}
		} as TransportOptions);

		const mailOptions = {
			from: 'aridon.krasniqi@radix.com',
			to: options.to,
			subject: options.subject,
			text: options.text
		};

		// Send the email
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) return console.log('Email is not sent', err);
			else console.log('Emails has been sent', info);
		});
	};
}
