import nodemailer from 'nodemailer';

interface MailOptions {
  email: string;
  authNumber: string;
}

const transporter = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: 'naver',
  host: 'smtp.naver.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async ({ email, authNumber }: MailOptions) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: '[핏미업] 회원가입을 위한 이메일 인증 번호입니다.',
    html: `<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody>
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="600">
            <tbody>
              <tr>
                <td align="center" style="padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; font-size: 1.25rem">
                  <b>핏미업 회원가입 이메일 인증 코드</b>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 10px; padding-bottom: 20px; padding-left: 0; padding-right: 0;">
                  회원가입을 위한 이메일 인증 코드입니다. 아래 코드를 인증 코드 입력란에 입력해 주세요.
                </td>
              </tr>
              <tr>
                <td align="center" style="border-top: 1px solid #EEEEEE; border-bottom: 1px solid #EEEEEE;">
                  <table border="0" cellpadding="0" cellspacing="0" width="300" style="padding-top: 100px; padding-bottom: 100px; padding-left: 0; padding-right: 0;">
                    <tbody>
                      <tr>
                        <td align="center" bgColor="#EEEEEE" style="border-radius: 8px; font-size: 2rem; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0;">
                          <b>${authNumber}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
    </table>`,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};
