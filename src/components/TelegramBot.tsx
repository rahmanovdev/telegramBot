import "./TelegramBot.css";

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormTelegram {
  username: string;
  email: string;
  subject: string;
  description: string;
}

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHATH_ID = import.meta.env.VITE_TG_CHAT_ID;

export default function TelegramBot() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<IFormTelegram>();

  const messageModel = (data: IFormTelegram) => {
    let messageTG = `Username : <b>${data.username}</b>\n`;
    messageTG += `Email Adress : <b>${data.email}</b>\n`;
    messageTG += `Subject : <b>${data.subject}</b>\n`;
    messageTG += `Description : <b>${data.description}</b>`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHATH_ID,
      parse_mode: "html",
      text: messageModel(data),
    });
    reset();
  };

  return (
    <div>
      <h2>Telegram Bot Integration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input_divs">
          <input
            type="text"
            placeholder="username"
            {...register("username", { required: true })}
          />
          <input
            type="text"
            placeholder="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          <input
            type="text"
            placeholder="subject"
            {...register("subject", { required: true })}
          />
          <input
            type="text"
            placeholder="description"
            {...register("description", { required: true })}
          />
          {isSubmitting ? (
            <button className="btn_loading" type="submit">
              Loading
            </button>
          ) : (
            <button className="btn_send" type="submit">
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
