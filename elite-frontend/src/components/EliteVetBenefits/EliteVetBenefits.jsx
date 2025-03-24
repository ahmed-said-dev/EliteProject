import React from "react";

const benefits = [
  {
    icon: "paw",
    title: "Personalized Care",
    description: "We develop tailored treatment plans that consider your pet's unique needs, health history, and lifestyle.",
    delay: "0.4s"
  },
  {
    icon: "microscope",
    title: "Latest Technology",
    description: "Our clinic is equipped with cutting-edge diagnostic and treatment equipment for accurate and efficient pet care.",
    delay: "0.6s"
  },
  {
    icon: "user-md",
    title: "Compassionate Staff",
    description: "Our dedicated team of veterinary professionals treats each pet with love, care, and respect.",
    delay: "0.8s"
  },
  {
    icon: "hospital-symbol",
    title: "Emergency Care",
    description: "Available 24/7 for your pet's urgent medical needs with quick response times and expert care.",
    delay: "1s"
  }
];

export default function EliteVetBenefits() {
  return (
    <>
      <section
        className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden"
        style={{
          paddingTop: "70px",
          paddingBottom: "40px",
          backgroundBlendMode: "luminosity",
          backgroundAttachment: "fixed",
          position: "relative",
          backgroundPosition: "left center",
          backgroundImage: 'url("/banner/bg1.webp")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
          direction: "ltr"
        }}
      >
        <div
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(107, 78, 152, 0.85)", // Purple overlay
            zIndex: 0,
          }}
        />
        <div
          className="container"
          style={{
            width: "100%",
            paddingRight: "calc(20px * 0.5)",
            paddingLeft: "calc(20px * 0.5)",
            marginRight: "auto",
            marginLeft: "auto",
            maxWidth: "1140px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="row content-wrapper style-7 align-items-center"
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "calc(-1 * 0)",
              marginRight: "calc(-0.5 * 20px)",
              marginLeft: "calc(-0.5 * 20px)",
              alignItems: "center",
            }}
          >
            <div
              className="col-lg-6 m-b30 wow fadeInUp"
              style={{
                maxWidth: "100%",
                paddingRight: "calc(20px * 0.5)",
                paddingLeft: "calc(20px * 0.5)",
                marginTop: "0",
                flex: "0 0 auto",
                flexShrink: 0,
                width: "50%",
                marginBottom: "30px",
                order: 2,
                visibility: "visible",
                animationDuration: "0.7s",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div
                className="section-head style-1 m-b30"
                style={{
                  marginBottom: "30px",
                }}
              >
                <h2
                  className="title text-white m-b0 wow fadeInUp"
                  style={{
                    marginTop: "0px",
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: "0px",
                    lineHeight: 1.3,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    fontSize: "38px",
                    visibility: "visible",
                    animationDuration: "0.7s",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                    color: "rgba(255, 255, 255, 1)",
                    textAlign: "left"
                  }}
                >
                  Why Choose Elite Vet?
                  <br />
                  Your Pet's Well-being, Our Priority
                </h2>
              </div>
              <div
                className="row row-wrapper g-5"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "calc(-1 * 40px)",
                  marginRight: "calc(-0.5 * 3rem)",
                  marginLeft: "calc(-0.5 * 3rem)",
                  position: "relative",
                }}
              >
                {benefits.map((item, index) => (
                  <div
                    key={index}
                    className="col-sm-6"
                    style={{
                      maxWidth: "100%",
                      paddingRight: "calc(3rem * 0.5)",
                      paddingLeft: "calc(3rem * 0.5)",
                      marginTop: "40px",
                      flex: "0 0 auto",
                      flexShrink: 0,
                      width: "50%",
                      position: "relative",
                    }}
                  >
                    <div
                      className="icon-bx-wraper style-4 text-center text-white wow fadeInUp"
                      style={{
                        position: "relative",
                        borderRadius: "20px",
                        padding: "20px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(30px)",
                        visibility: "visible",
                        animationDuration: "0.7s",
                        animationDelay: item.delay,
                        animationName: "fadeInUp",
                        textAlign: "left",
                        color: "rgba(255, 255, 255, 1)",
                      }}
                    >
                      <div
                        className="icon-bx bg-primary"
                        style={{
                          transition: "0.5s",
                          position: "relative",
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "10px",
                          marginRight: "auto",
                          marginLeft: "auto",
                          backgroundColor: "rgb(124, 88, 211)",
                        }}
                      >
                        <span className="icon-cell">
                          <i className={`fas fa-${item.icon} fa-2x`} />
                        </span>
                      </div>
                      <div
                        className="icon-content"
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <h3
                          className="dz-title"
                          style={{
                            marginBottom: "0.5rem",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            lineHeight: 1.4,
                            position: "relative",
                            marginTop: "0px",
                            fontSize: "18px",
                            color: "rgb(255, 255, 255)",
                            textAlign: "left"
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            margin: "0px",
                            marginTop: "0px",
                            marginBottom: "0px",
                            fontSize: "15px",
                            fontWeight: 200,
                            opacity: 0.7,
                            textAlign: "left"
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="col-lg-6 m-b30 wow fadeInUp"
              style={{
                maxWidth: "100%",
                paddingRight: "calc(20px * 0.5)",
                paddingLeft: "calc(20px * 0.5)",
                marginTop: "0",
                flex: "0 0 auto",
                flexShrink: 0,
                width: "50%",
                marginBottom: "30px",
                order: 1,
                visibility: "visible",
                animationDuration: "0.7s",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div
                className="content-media"
                style={{
                  position: "relative",
                  marginRight: "0px",
                }}
              >
                <div
                  className="dz-media"
                  style={{
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: "30px",
                  }}
                >
                  <img
                    src="/images/About-us/img5.webp"
                    alt="Elite Vet Experience"
                    style={{
                      borderStyle: "none",
                      verticalAlign: "middle",
                      maxWidth: "100%",
                      height: "auto",
                      width: "100%",
                      position: "relative",
                      zIndex: 1,
                      borderRadius: "30px"
                    }}
                  />
                </div>
                <div
                  className="item1"
                  style={{
                    position: "absolute",
                    left: "-20px",
                    right: "auto",
                    bottom: "-20px",
                    width: "170px",
                    zIndex: 2,
                  }}
                >
                  <div
                    className="info-widget style-11 bg-primary text-center"
                    style={{
                      borderRadius: "20px",
                      padding: "25px 20px",
                      textAlign: "center",
                      backgroundColor: "#6B4E98",
                      boxShadow: "0 0 60px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      className="content-text text-white"
                      style={{
                        display: "block",
                        fontWeight: 700,
                        lineHeight: 1,
                        fontSize: "52px",
                        color: "rgba(255, 255, 255, 1)",
                        marginBottom: "5px",
                      }}
                    >
                      <span className="counter">20</span>
                      <span style={{ fontSize: "40px" }}>+</span>
                    </span>
                    <h3
                      className="title m-b0 text-white"
                      style={{
                        marginTop: "0px",
                        fontFamily: "Poppins, sans-serif",
                        lineHeight: 1.2,
                        marginBottom: "0px",
                        fontSize: "18px",
                        fontWeight: 400,
                        opacity: 0.9,
                        color: "rgba(255, 255, 255, 1)",
                        textAlign: "center"
                      }}
                    >
                      Years
                      <br />
                      Experienced
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  scroll-behavior: smooth;
  overflow: unset;
}

body {
  margin: 0px;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  color: #7a6e99;
  text-align: var(--bs-body-text-align);
  background-color: #ffffff;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-attachment: fixed;
  background-size: cover;
  overflow: clip scroll;
}
`,
        }}
      />
    </>
  );
}
