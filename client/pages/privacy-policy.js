import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loding from "../components/loading/Loding";

export default function PrivacyPolicy() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Loding />
      </>
    );
  }
  return (
    <div className=" pt-40 w-full min-h-screen">
      <Head>
        <title>privacy policy - w3blog</title>
        <meta name="keywords" content="privacy policy ,w3blog" />
        <meta name="description" content="privacy policy descriction w3blog" />
      </Head>
      <div className=" w-[1139px] mx-auto xl:w-full xl:px-9 sm:px-6 ms:px-3">
        <div className="">
          <div className=" flex items-center pb-3 xs:flex-wrap break-all">
            <Link
              href={"/"}
              className=" text-xs capitalize bg-black text-white hover:text-gray-300  rounded-[3px] p-[3px] break-all"
            >
              home
            </Link>
            <span className=" ml-1">
              <svg
                className="fill-current h-4 w-4 -rotate-90  text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <span className=" text-xs capitalize  break-all">
              privacy-policy
            </span>
          </div>
          <h1 className=" mb-14 font-bold text-3xl capitalize break-all">
            privacy policy
          </h1>
        </div>
        <div className="">
          <p className=" pb-8">
            Techworm.net respects the privacy concerns of the users of its
            Internet Sites (“Sites”), and has created this privacy statement to
            explain what information we gather from your visit to our Sites, and
            how such information may be used.
          </p>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl">
              Use of information
            </h2>
            <p className=" pb-8">
              As a general policy, no personally identifiable information, such
              as your name or address, is automatically collected from your
              visit to techworm.net.
            </p>
            <p className=" pb-8">
              However, certain non-personal information is recorded by the
              standard operation of techworm.net Internet servers.
            </p>
            <p className=" pb-8">
              Information such as the type of browser being used, its operating
              system, and your IP address is gathered in order to enhance your
              online experience.
            </p>
            <p className=" pb-8">
              For example, it may be used to tailor content and advertising to
              your interests.
            </p>
            <p className=" pb-8">
              In special cases, Techworm.net may disclose user information when
              there is reason to believe that disclosing this information is
              necessary to identify, contact or bring legal action against
              someone who may be causing injury to, or interference (either
              intentionally or unintentionally) with, Techworm.net’s rights or
              property, other techworm.net web site users, or anyone else that
              could be harmed by such activities.
            </p>
          </div>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl">Security</h2>
            <p className=" pb-8">
              Security for all personally identifiable information is extremely
              important to us. Unfortunately, no data transmission over the
              Internet can be guaranteed to be 100% secure. While we strive to
              protect your personal information, techworm.net
            </p>
            <p className=" pb-8">
              cannot ensure or warrant the security of any information you
              transmit to us or from our online forms, and you do so at your own
              risk. Once we receive your transmission, we make our best effort
              to ensure its security on our systems.
            </p>
          </div>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl"> Use of Cookies</h2>
            <p className=" pb-8">
              Cookies are pieces of information that a website transfers to an
              individual’s computer hard drive for record-keeping purposes.
              Cookies are used to track visits to our Sites and to personalize
              the Sites for new and current subscribers. Most browsers are
              initially set up to accept cookies; however, you can reset your
              browser to refuse all cookies or indicate when a cookie is being
              sent. (Note: you will need to consult the help area of your
              browser application for instructions.) If you choose to disable
              your cookies setting or refuse to accept a cookie, some parts of
              techworm.net’s websites may not function properly.
            </p>
          </div>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl">
              Use of IP Addresses
            </h2>
            <p className=" pb-8">
              An IP address is a number that’s automatically assigned to your
              computer by your Internet provider whenever you surf the Web. When
              you request pages from techworm.net Sites, our servers log your IP
              address. techworm.net collects IP addresses for the purposes of
              system administration, to report aggregate information to our
              advertisers, and to audit the use of our Site. We may use your IP
              addresses in cooperation with your Internet provider to identify
              you if we deem it necessary to enforce compliance with our Terms
              of Use or to protect our service, Sites, customers, or others.
            </p>
          </div>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl">
              Links to Other Site
            </h2>
            <p className=" pb-8">
              s Techworm.net is not responsible for the content or practices of
              third party websites that may be linked to our Sites. Our Sites
              may link to websites operated by other companies; we are not
              responsible for the privacy practices of such websites. Visitors
              to these websites should refer to each web site’s respective
              privacy policies and practices.
            </p>
          </div>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl">
              Third Party Cookies
            </h2>
            <p className=" pb-8">
              In the course of serving advertisements to our sites, our
              third-party advertisers may place or recognize a unique “cookie”
              on your browser.
            </p>
            <p className=" pb-8">
              We use third-party advertising company to serve ads when you visit
              our Web site. These company may use aggregated information (not
              including your name, address, email address or telephone number)
              about your visits to this and other Web sites in order to provide
              advertisements about goods and services of interest to you. If you
              would like more information about this practice and to know your
              choices about not having this information used by these companies,
              visit the Network Advertising Initiative or Self-Regulatory
              Program for Online Behavioral Advertising.
            </p>
            <p className=" pb-8">
              Google AdSense and Media.net as a third party vendor, uses cookies
              to serve ads on our websites. Google Adsense and Media.net’s use
              of the DART cookie enables it to serve ads to our users based on
              their visit to our sites and other sites on the Internet. Users
              may opt out of the use of the DART cookie by visiting the Google
              and Media.net ad and content network privacy policy
            </p>
          </div>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl">Contact Us</h2>
            <p className=" pb-8">
              If you have any questions about this privacy statement, the
              practices of our Sites, or your dealings with our Sites, you can
              email us Information provided by you via general email inquiries
              to techworm.net such as your email address is used only to respond
              to your inquiries in the ordinary course of business and is never
              shared with third parties.
            </p>
            <p className=" pb-8">contact us by clicking here</p>
          </div>
          <div className="">
            <h2 className="  mb-14  font-semibold text-3xl">
              Your Acceptance of These Terms
            </h2>
            <p className=" pb-8">
              By using techworm.net and its Sites, you signify your acceptance
              of the techworm.net Privacy Policy. If you do not agree to this
              policy, please do not use our Sites. techworm.net reserves the
              right to modify, alter or otherwise update this policy at any
              time. We encourage visitors to review this policy from time to
              time. Your continued use of the techworm.net Sites following the
              posting of changes to these terms indicates your acceptance of
              these changes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
