import GoogleMap from "../components/GoogleMap";
import PageHeader from "../components/PageHeader";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import AxiosInstance from "../api/AxiosInstance";

const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send our Message";

const contactList = [
  {
    imgUrl: "/src/assets/images/icon/01.png",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "Ho Chi Minh City, Viet Nam",
  },
  {
    imgUrl: "/src/assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone number",
    desc: "0867572354",
  },
  {
    imgUrl: "/src/assets/images/icon/03.png",
    imgAlt: "contact icon",
    title: "Send email",
    desc: "admin@shopcart.com",
  },
  {
    imgUrl: "/src/assets/images/icon/04.png",
    imgAlt: "contact icon",
    title: "Our website",
    desc: "www.shopcart.com",
  },
];

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();
  // const [inputName, setInputName] = useState("");
  // const [inputEmail, setInputEmail] = useState("");
  // const [inputNumber, setInputNumber] = useState("");
  // const [inputSubject, setInputSubject] = useState("");
  // const [inputMessage, setInputMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;
    const subject = form.subject.value;
    const email = form.email.value;
    const message = form.message.value;

    if (name === "") return setErrorMessage("Please provide your name");
    if (number === "")
      return setErrorMessage("Please provide your phone number");
    if (subject === "") return setErrorMessage("Please provide your subject");
    if (email === "") return setErrorMessage("Please provide your email");
    if (message === "") return setErrorMessage("Please provide your message");

    try {
      const response = await AxiosInstance.post("contact/create/", {
        name: name,
        phone: number,
        subject: subject,
        email: email,
        message: message,
      });
      if (response.status == 201) {
        form.name.value = "";
        form.number.value = "";
        form.subject.value = "";
        form.email.value = "";
        form.message.value = "";
        setErrorMessage("");
        enqueueSnackbar("Send message successfully", { variant: "success" });
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };
  return (
    <div>
      <PageHeader title="Get In Touch With Us" curPage={"Contact Us"} />
      <div className="map-address-section padding-tb section-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
            <h2 className="title">{title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row flex-row-reverse">
              <div className="col-xl-4 col-lg-5 col-12">
                <div className="contact-wrapper">
                  {contactList.map((contact, index) => (
                    <div key={index} className="contact-item">
                      <div className="contact-thumb">
                        <img src={contact.imgUrl} alt="" />
                      </div>
                      <div className="contact-content">
                        <h6 className="title">{contact.title}</h6>
                        <p>{contact.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* google map */}
              <div className="col-xl-8 col-lg-7 col-12">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section padding-tb">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{conSubTitle}</span>
            <h2 className="title">{conTitle}</h2>
          </div>
          <div className="section-wrapper">
            <form action="" className="contact-form" onSubmit={handleContact}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name *"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email *"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="number"
                  id="number"
                  placeholder="Phone number *"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Your subject *"
                />
              </div>
              <div className="form-group w-100">
                <textarea
                  name="message"
                  id="message"
                  rows="8"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div>
                {errorMessage && (
                  <div className="error-message text-danger mb-1">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="form-group w-100 text-center">
                <button className="lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
