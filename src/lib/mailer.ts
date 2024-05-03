import nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
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

export const sendEmail = async ({ to, authNumber }: MailOptions) => {
  const authNumberList = authNumber.split('');

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: to,
    subject: '[핏미업] 회원가입을 위한 이메일 인증 번호입니다.',
    html: `<div
    style='
    text-align: center;
    width: 700px;
    height: 100%;
    margin: 1rem auto;
    padding: 20px;
    box-shadow: 1px 1px 3px 0px #eee
    '>
    <h2>핏미업 회원가입 인증 번호</h2>
    <div style='height: 1px; background-color: #eee; margin-bottom: 2rem;'/>
    <p>회원가입을 위한 이메일 인증 번호입니다. 아래 번호를 인증 번호 입력란에 입력해주세요.</p>
    <div style='height: 1px; background-color: #eee; margin-top: 2rem; margin-bottom: 2rem;'/>
    <div style='display: flex; justify-content: center; align-items: center;'>
      <p style='width: 50px; height: 60px; background-color: #eee; border-radius: 8px; text-align: center; font-size: 2rem; font-weight: 700; padding: 10px; line-height: 60px;'>
        ${authNumberList[0]}
      </p>
      <p style='width: 50px; height: 60px; background-color: #eee; border-radius: 8px; text-align: center; font-size: 2rem; font-weight: 700; padding: 10px; line-height: 60px; margin-left: 0.5rem; margin-right: 0.5rem;'>
        ${authNumberList[1]}
      </p>
      <p style='width: 50px; height: 60px; background-color: #eee; border-radius: 8px; text-align: center; font-size: 2rem; font-weight: 700; padding: 10px; line-height: 60px;'>
        ${authNumberList[2]}
      </p>
      <div style='width: 8px; height: 8px; background-color: #000; border-radius: 50%; margin-left: 1rem; margin-right: 1rem;'/>
      <p style='width: 50px; height: 60px; background-color: #eee; border-radius: 8px; text-align: center; font-size: 2rem; font-weight: 700; padding: 10px; line-height: 60px;'>
        ${authNumberList[3]}
      </p>
      <p style='width: 50px; height: 60px; background-color: #eee; border-radius: 8px; text-align: center; font-size: 2rem; font-weight: 700; padding: 10px; line-height: 60px; margin-left: 0.5rem; margin-right: 0.5rem;'>
        ${authNumberList[4]}
      </p>
      <p style='width: 50px; height: 60px; background-color: #eee; border-radius: 8px; text-align: center; font-size: 2rem; font-weight: 700; padding: 10px; line-height: 60px;'>
        ${authNumberList[5]}
      </p>
    </div>
    <div style='height: 1px; background-color: #eee; margin-top: 2rem; margin-bottom: 2rem;'/>
    <p style='color: #666; font-size: 12px;'>
    이 메일은 발신 전용으로, 회신을 통해 문의하시는 경우 답변을 드릴 수 없습니다.<br/>
    자세한 사항은 핏미업 문의게시판을 이용해 주시기 바랍니다.
    </p>
    </div>`,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};
