import { markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";

const HeroBanner = ({ banner }: any) => {
  const {
    title,
    content,
    image,
    button,
    google_play,
    weekly_active_users,
    last_month_donation,
    last_month_shares,
  } = banner;

  return (
    <section className="headerBg -mt-[102px] relative z-40">
      <div className="container">
        <div className="pt-[140px] lg:pt-[240px]">
          <div className="row justify-center">
            <div className="col-11">
              <div className="row justify-center lg:justify-between">
                {/* Text Content Section */}
                <div className="lg:col-7 order-2 lg:order-1">
                  <h1
                    className="font-medium text-dark"
                    dangerouslySetInnerHTML={markdownify(title)}
                  />
                  <p
                    className="text-2xl text-dark mt-2 mb-4"
                    dangerouslySetInnerHTML={markdownify(content)}
                  />
                  <div className="flex items-center gap-6">
                    {button.enable && (
                      <a
                        href={button.link}
                        className="btn btn-primary py-1 px-3 -mb-5 font-normal text-base"
                      >
                        <span className="flex items-center gap-2">
                          <FaPlusCircle />
                          {button.label}
                        </span>
                      </a>
                    )}

                    {google_play.enable && (
                      <a href={google_play.link} target="__blank" rel="noreferrer">
                        <Image
                          src={google_play.image}
                          alt="playstore"
                          width={160}
                          height={45}
                        />
                      </a>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-3 mt-14 text-[12px] gap-6 lg:gap-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/homepage/weeklyusers.png"
                        alt="Weekly Active Users"
                        width={30}
                        height={30}
                      />
                      <div>
                        <p>Weekly Active Users</p>
                        <p
                          className="font-bold"
                          dangerouslySetInnerHTML={markdownify(weekly_active_users)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/homepage/monthlydonate.png"
                        alt="Last Month Donation"
                        width={30}
                        height={30}
                      />
                      <div>
                        <p>Last Month Donation</p>
                        <p
                          className="font-bold"
                          dangerouslySetInnerHTML={markdownify(last_month_donation)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/homepage/monthlyshares.png"
                        alt="Last Month Shares"
                        width={30}
                        height={30}
                      />
                      <div>
                        <p>Last Month Shares</p>
                        <p
                          className="font-bold"
                          dangerouslySetInnerHTML={markdownify(last_month_shares)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="lg:col-5 order-1 lg:order-2">
                  <Image
                    src={image}
                    alt="hero"
                    width={600}
                    height={400}
                    className="lg:w-full bg-cover rounded-lg relative z-20 shadow-2xl mx-auto mb-14 lg:mb-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Gradient Layers */}
          <div className="relative -top-[500px] -right-[500px] max-sm:hidden">
            <div className="relative mx-auto h-[602px] w-[530px] sm:w-[130px]">
              <div className="absolute top-[-66.3%] left-[-84.6%] h-full w-full bg-[#0b7965b2] blur-[135px]"></div>
              <div className="absolute top-[-66.1%] right-[10%] h-full w-full bg-[#0da4eac7] opacity-60 blur-[100px]"></div>
              <div className="max-lg:hidden absolute top-1/2 left-[-50%] h-full w-full bg-[#17d8b5] opacity-63 blur-[102px]"></div>
              <div className="max-lg:hidden absolute top-[53.7%] left-[14.8%] h-full w-full bg-[#f5fffd] opacity-43 blur-[140px]"></div>
              <div className="max-lg:hidden absolute top-[69.3%] right-[-90%] h-full w-full bg-[#00bb98] opacity-50 blur-[136px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
