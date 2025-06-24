import { Images } from '../../utils/constants/Images'

//  constants for temporary data storage
export const onBoardingScreenData = {
  onBoardQuestions: [
    {
      id: 1,
      eventId: 2478,
      question: 'What is your activity level?',
      sub_text: 'This helps us design your workouts to fit your lifestyle',
      questionType: 'list',
      options: [
        {
          id: 1,
          icon: 'very-active',
          iconPosition: 'left',
          text: 'Sedentary',
          subText: 'Little to almost no exercise',
          imagePath: null
        },
        {
          id: 2,
          icon: 'Moderatly-active',
          iconPosition: 'left',
          text: 'Slightly Active',
          subText: 'Little to almost no exercise',
          imagePath: null
        },
        {
          id: 3,
          icon: 'very-active',
          iconPosition: 'left',
          text: 'Moderately Active',
          subText: 'Little to almost no exercise ',
          imagePath: null
        },
        {
          id: 4,
          icon: 'Moderatly-active',
          iconPosition: 'left',
          text: 'Very Active',
          subText: 'Little to almost no exercise',
          imagePath: null
        }
      ]
    },
    {
      id: 2,
      eventId: 2478,
      question: 'Choose your belly condition?',
      sub_text: 'Knowing your goals help us tailor your experience',
      questionType: 'images',
      options: [
        {
          id: 1,
          icon: null,
          iconPosition: null,
          text: null,
          subText: null,
          imagePath: Images.belly1
        },
        {
          id: 2,
          icon: null,
          iconPosition: null,
          text: null,
          subText: null,
          imagePath: Images.belly2
        },
        {
          id: 3,
          icon: null,
          iconPosition: null,
          text: null,
          subText: null,
          imagePath: Images.belly3
        },
        {
          id: 4,
          icon: null,
          iconPosition: null,
          text: null,
          subText: null,
          imagePath: Images.belly4
        },
        {
          id: 5,
          icon: null,
          iconPosition: null,
          text: null,
          subText: null,
          imagePath: Images.belly5
        }
      ]
    },
    {
      id: 3,
      eventId: 2478,
      question: 'What type of exercises do you enjoy?',
      sub_text: null,
      questionType: 'list-multiselect',
      options: [
        {
          id: 1,
          icon: 'Strwnght-training',
          iconPosition: 'right',
          text: 'Strength Training',
          subText: null,
          imagePath: null
        },
        {
          id: 2,
          icon: 'Yoga-1',
          iconPosition: 'left',
          text: 'Yoga or Pilates',
          subText: null,
          imagePath: null
        },
        {
          id: 3,
          icon: 'Cardio-1',
          iconPosition: 'left',
          text: 'Cardio (Running, Cycling)',
          subText: null,
          imagePath: null
        },
        {
          id: 4,
          icon: 'Step',
          iconPosition: 'left',
          text: 'HIIT (High-intensity interval training) ',
          subText: null,
          imagePath: null
        },
        {
          id: 5,
          icon: 'Other-icon',
          iconPosition: 'left',
          text: 'Other',
          subText: null,
          imagePath: null
        }
      ]
    },
    {
      id: 4,
      eventId: 2478,
      question: 'What motivates you to stay active?',
      sub_text: null,
      questionType: 'check-box', // check-box-multiselect
      options: [
        {
          id: 1,
          icon: null,
          iconPosition: null,
          text: 'Setting and achieving goals',
          subText: null,
          imagePath: null
        },
        {
          id: 2,
          icon: null,
          iconPosition: null,
          text: 'Social accountability',
          subText: null,
          imagePath: null
        },
        {
          id: 3,
          icon: null,
          iconPosition: null,
          text: 'Tracking progress',
          subText: null,
          imagePath: null
        },
        {
          id: 4,
          icon: null,
          iconPosition: null,
          text: 'Competing with others',
          subText: null,
          imagePath: null
        },
        {
          id: 5,
          icon: null,
          iconPosition: null,
          text: 'Enjoyment of the activity',
          subText: null,
          imagePath: null
        }
      ]
    },
    {
      id: 5,
      eventId: 2478,
      question: null,
      sub_text: null,
      questionType: 'card', // check-box-multiselect
      card_image_path: Images.runner_bg_image,
      options: [
        {
          id: 1,
          icon: null,
          iconPosition: null,
          text: 'Find Your Workout',
          subText:
            'Discover and access a wide variety of workout routines, filter and sort them based on criteria like type, duration, and intensity, and often receive personalized recommendations to meet your fitness goals and preferences.',
          imagePath: null
        },
        {
          id: 2,
          icon: null,
          iconPosition: null,
          text: 'Find Your Workout',
          subText:
            'Discover and access a wide variety of workout routines, filter and sort them based on criteria like type, duration, and intensity, and often receive personalized recommendations to meet your fitness goals and preferences.',
          imagePath: null
        },
        {
          id: 3,
          icon: null,
          iconPosition: null,
          text: 'Find Your Workout',
          subText:
            'Discover and access a wide variety of workout routines, filter and sort them based on criteria like type, duration, and intensity, and often receive personalized recommendations to meet your fitness goals and preferences.',
          imagePath: null
        }
      ]
    }
  ]
}

export const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 16px;
            color: #333;
            line-height: 1.6;
          }
          h2 {
            color: #e91e63;
            margin-top: 24px;
          }
          h3 {
            color: #3f51b5;
            margin-top: 16px;
          }
        </style>
      </head>
      <body>
        <h2>Registration</h2>
        <h3>How do I register for the event?</h3>
        <p>All the registrations are done from our website <a href="https://www.necessarydevil.com" target="_blank">www.necessarydevil.com</a>. You can click on “Registration Button” which will take you to the ‘Registration site’. You will have to sign up with your Email. The site will then ask you a few basic questions like your Name, Date of Birth, your registered distance, City & PIN/ZIP code & you can register for the event. Once you are registered you would be mailed your e-BIB. We usually provide a registration link in the Event’s marketing collateral.</p>

        <h2>Running Apps</h2>
        <h3>Which all apps & wearables are you compatible with?</h3>
        <p>Ideally all the apps which can share public URL of the activity are preferred for timing validations. However, We are comfortable with running apps like Strava & Map-my-Run. We also integrate with wearable watches like Garmin, Fitbit, Google Fit & Mi Fit, in order to give you a verified timing on your certificate.</p>

        <h2>During the Event</h2>
        <h3>Is any support provided by you during the event?</h3>
        <p>No. Since this is a virtual event. Participants have to manage their own support.</p>

        <h3>What do I do in case of a medical emergency?</h3>
        <p>Keep emergency numbers in your route handy.</p>

        <h3>Do I need to wear my BIB during running?</h3>
        <p>Wearing a BIB during the event is not mandatory. However, participants are requested to kindly save their BIB numbers. This will make it easier to address your support queries.</p>

        <h3>What if I take a pause? Do you consider run-time or the elapsed time?</h3>
        <p>We take run time for the certificate. Pauses while running or the run time are not considered.</p>

        <h3>What will happen if I run a distance short of my declared distance?</h3>
        <p>Your certificate will mention the distance travelled & the time taken. However, if there are any leader-boards or prizes you will be disqualified for that.</p>

        <h3>What will happen if I exceed the distance than my declared distance? Will it not affect my fitness score?</h3>
        <p>No, the algorithm takes care of excess distances.</p>

        <h2>Uploading my activity</h2>
        <h3>How do I upload my activity?</h3>
        <p>After you register for the event you would receive a consent mail. Once you give us your consent, our software will automatically pick your activity & validate it. In case you do not give us your consent, please login to your account on our website or follow the link mailed to you. You will see the option “Upload your activity”. If you are using any of the approved tracking apps like Strava or Map-my-Run, then provide the URL of your activity. If you are using any other running app, then you can enter your details manually & load the screenshot of your run displaying distance & timing details so that your run can be validated.</p>

        <h3>What if I don’t have any app or wearable?</h3>
        <p>If the event organizer allows then, login to your account on our website or follow the link sent to you by us on mail and enter your timing manually. However, in that case we will not give a “validated timing certificate”.</p>

        <h3>What if my app is not compatible with your software?</h3>
        <p>Login to our account on our website & enter your timing manually & upload a screenshot of your run displaying distance & timing details for validation purpose.</p>

        <h2>Results</h2>
        <h3>What all things I can expect if I successfully complete my run?</h3>
        <p>Once you complete your run & upload your results, you will get Fitness report, E-certificate with validated Runtime & route traversed & Run analytics. However minimum deliverables would be as mentioned in the event’s marketing collateral.</p>

        <h3>How are my certificates & fitness report delivered to me?</h3>
        <p>You can Sign in our site & find these things with your BIB number as reference. We will also mail you these documents independently.</p>

        <h3>What is validated race timing?</h3>
        <p>A validated race time is one which is furnished by the app (like Strava). A manually uploaded timing with a backup from the screen shot is also considered as a validated timing.</p>

        <h3>What run analytics do I get?</h3>
        <p>You will get a local runners map: it will tell you how many participants participated from your area. You will also get your running routes used by other runners in your area (Right now provided only for Strava users). However, the run analytics to be given will be defined by the Event’s marketing collateral.</p>

        <h3>How can I make use of run-analytics. What advantage will they give me?</h3>
        <p>You can find new routes in your area. Develop running community, find new running partners & network with them.</p>
      </body>
    </html>
  `

export const htmlPrivacypolicyContent = `<div class="container">
			<p class="mb-4">Please read this privacy policy carefully by accessing or using the website, you agree to be bound by the terms described herein and all the terms incorporated by reference. If you do not agree to all of these terms, do not use the website.<br>Your privacy is of utmost importance to us and protection of your information is a key commitment for us. We are governed by the provisions of applicable laws to maintain the privacy of your information.</p>

			<h4 class="mb-3">Content &amp; Purpose of the Privacy Policy</h4>
			<p class="mb-4">This privacy policy (“Privacy Policy”) applies to your use of the domain name www.necessarydevil.com, an internet based portal, and a mobile application, owned and operated by Interface Infosoft Solutions Private Limited, a company duly incorporated under the provisions of the Companies Act, 2013 (hereinafter, referred to as “NecessaryDevil” or “Interface Infosoft Solutions. P. Ltd” or “We” or “Our” or “Us” or “Company”). The domain name and the mobile application are collectively referred to as “Website”.</p>

			<h4 class="mb-3">Definitions:</h4>

			<h4 class="mb-3">NecessaryDevil:</h4>
			<p class="mb-4">NecessaryDevil is a cloud-based technology platform that conducts endurance events. The scope of NecessaryDevil is (&amp; not limited to)</p>
			<ul style="list-style-type: disc;">
				<li class="mb-3 ml-3">Manage registrations for the event</li>
				<li class="mb-3 ml-3">Execution of the event</li>
				<li class="mb-3 ml-3">Send results and digital goods to the participants.</li>
				<li class="mb-3 ml-3">Send digital goods to the host.</li>
			</ul>

			<p class="mb-4">
				Interface Infosoft Solutions. P. Ltd: Interface Infosoft Solutions Private Limited, a company duly incorporated under the provisions of the Companies Act, 2013 solely owns &amp; operates the platform NecessaryDevil.<br>
				Event Organizer/Organizer: Are the entities which conduct physical/virtual events on NecessaryDevil on payable or free basis as per agreement between them &amp; Interface Infosoft Solutions. P. Ltd.<br>
				Participants: Participants are the entities which are coordinated by the organizers to participate in virtual endurance events.<br> There is no agreement whatsoever between Participants &amp; Interface Solutions. P. Ltd or NecessaryDevil.<br>
			</p>

			<h4 class="mb-3">Information Collection</h4>
			<p class="mb-4">
				We collect information during registration, use of the services site, communicating with site members, admin, using content, content upload to our site. We also receive information about your IP address, cookies and pages you visited. We use your information held about you in the following way:<br>
				1. To ensure that content from our site is presented in the most effective manner for you and for your computer; and facilitate transactions with you.<br>
				2. To carry out our obligations arising from any contracts entered into between you and us; and comply with applicable law if any in this regard.<br>
				3. To provide you with information that you request from us or which we feel may interest you, where you have consented to be contacted for such purposes.<br>
				4. To notify you about changes to our products and services and also to carry our further research and analysis for monitoring/ reviewing/ improving/ providing our products and services and selection of offers, promotions and marketing campaigns.<br>
				5. To verify your identity for us to provide products/services to you and to respond to your queries or feedback submitted by you.<br>
				6. To carry credit checks, screenings or due diligence checks as lawfully required by us and undertake audit, record keeping, reporting and develop risk management models.<br>
				7. To provide your personal information to our affiliates/ other trusted businesses/ persons/ service providers engaged by us, or institutions that we partner with, to assist us with providing you with products/services to better serve your needs and interests, based on your instructions and in compliance with our privacy policy and any other appropriate confidentiality and security measures.<br>
			</p>

			<h4 class="mb-3">Information Sharing</h4>
			<p class="mb-4">
				We will always obtain your prior specific consent before we share or disclose your personally identifiable information to any partner, and user. We are also accountable to disclose user information and the contents of the accounts to the local law enforcement authorities under specifically defined circumstances. In case Necessary Devil service gets merged or acquired, we will be informing on the website about such developments. <br>
				In case your profile is public, or your details are in public domain in our site, you will receive unsolicited messages from users in necessarydevil.com and from external sources. <br>
				When you have opted for receiving related information, we will use your information to show you relevant advertisements, contents, events from us and our partners. Access to your name, email address and private details is restricted to our employees who need to know such information in connection with our services and are bound by confidentiality obligations.
			</p>

<h4 class="mb-3">Cookies</h4>
<p class="mb-3">A “cookie” is a small piece of text file/ information stored by a web server on a web browser/ your device about your visit on our online platforms so it can be later read back from that browser. Cookies allow us to recognize a specific device in order to personalize and optimize your experience.</p>

<h4 class="mb-3">GOOGLE</h4>
<p class="mb-3">Third party vendors, including Google, use cookies to serve ads based on a user’s prior visits to your website or other websites. Google’s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Ads Settings.</p>

<h4 class="mb-3">IP address</h4>
<p class="mb-4">
	When you visit necessarydevil.com, we receive the Internet protocol (IP) address of your computer, operating system information, browser information and name of your ISP. This information is used to improve our service offerings, we are also legally accountable to pass the same information to legal authorities when requested. We also advanced web analytics, which provides information such as the URL of the site from which you came and the site to which you are going. <br>
	How Safe is your information? <br>
	We adopt appropriate data collection, storage and processing practices and security measures, as well as physical security measures to protect against unauthorized access, alteration, disclosure or destruction of your Personal Information, username, password, transaction information and data stored in your account. While we try our best to provide security that is commensurate with the industry standards, because of the inherent vulnerabilities of the internet, we cannot ensure or warrant complete security of all information that is being transmitted to us by you. Neither the Event organizer, nor NecessaryDevil is responsible for breach of data due to inherent vulnerabilities of internet. <br>
</p>

<h4 class="mb-3">Links to third-party advertisements:</h4>
1. The links to third-party advertisements, third party websites or any third party electronic communication services (referred to as “Third-Party Links”) may be provided on the Website which are operated by third parties and are not controlled by, or affiliated to, or associated with NecessaryDevil unless expressly specified on the Website. 2. If you access any such Third-Party Links, we request you review the website’s privacy policy. We are not responsible for the policies or practices of Third-Party Links.

<h4 class="mb-3">Notification of changes</h4>
When there are significant changes to the privacy policy, the same will be posted on our websites in order to keep you informed of any changes in nature of information collected, manner of collection, use and sharing of information.

<h4 class="mb-3">Conflict between privacy policy &amp; terms of service</h4>
At any time, when there is a conflict between the terms of service and the privacy policy, the Terms of service shall prevail. We don’t provide service to children under age 16, therefore we don’t collect their information and privacy policy makes no provision for children’s use of the site.

<h4 class="mb-3">Information Policy</h4>
<p class="mb-4">
	1. Information collected from all users <br>
	For all Users, we collect Personal Data when you voluntarily provide such information to the Services, such as when you register for access to the Services, contact us with inquiries, respond to one of our surveys or browse or use certain parts of the Services. The Personal Data we may collect includes without limitation your name, address, email address and any other information that you choose to provide and/or that enables Users to be personally identified. <br><br>
	
	2. Information we automatically collect <br>
	We also automatically collect certain technical data that is sent to us from the computer, mobile device and/or browser through which you access the Services (“Automatic Data”). Automatic Data, includes without limitation, a unique identifier associated with your access device and/or browser (including, for example, your Internet Protocol (IP) address) characteristics about your access device and/or browser, statistics on your activities on the Services, information about how you came to the Services and data collected through Cookies, Pixel Tags, Local Shared Objects, Web Storage and other similar technologies. You can find out more information about how we use Cookies and other similar tracking technologies in our Cookie Statement. When you register for the Services or otherwise submit Personal Data to us, we may associate other Non-Personal Data (including Non-Personal Data we collect from third parties) with your Personal Data. At such instance, we will treat any such combined data as your Personal Data until such time as it can no longer be associated with you or used to identify. <br><br>
	
	3. Information collected from organizers <br>
	If you are an Organizer we will collect additional Personal Data from you. Information you provide to us: In some cases, we may collect your credit card information (e.g., your credit card number and expiration date, billing address, etc.), some of which may constitute Personal Data, to secure certain payments. In addition, if you use our payment processing services, we will collect financial information from you (e.g., your bank account information or an address to send checks) as necessary to facilitate payments and information required for tax purposes (e.g., your taxpayer identification number). Information we obtain from other sources: We may also collect or receive Personal Data including your name, email address and other contact information from third party sources, such as third-party websites and marketing partners, your bank, our payment processing partners and credit reporting agencies. <br><br>
	
	4. Information collected from users. <br>
	If you are a Consumer we will collect additional Personal Data from you, sometimes for our own purposes and other times on behalf of an Organizer (see Section 16 below for more information). Information you provide via NecessaryDevil/Interface Infosoft solutions .P .Ltd Properties or Applications: If you register for a paid event, you will provide financial information (e.g., your credit card number and expiration date, billing address, etc.) some of which may constitute Personal Data. In addition, Organizers can set up event registration pages to collect virtually any information from Consumers in connection with registration for an Organizer’s event listed on the Services. NecessaryDevil does not control an Organizer’s registration process nor the Personal Data that they collect. When you register for, or otherwise provide information to NecessaryDevil in conjunction with an Organizer event or activity, whether that information is yours or a third party’s, in connection with a purchase, registration, or transfer, that Organizer will receive and may use the information you provide. <br><br>
	
	5. Information we obtain from other sources <br>
	We may also collect or receive Personal Data from third party sources, such as Organizers, other Consumers, social media or other third-party integrations, your credit card issuing bank, our payment processing partners or other third parties. <br><br>
	
	6. Information collected for specific reasons <br>
	We collect &amp; use the Personal Data we collect in a manner that is consistent with this Privacy Policy, and applicable privacy laws. We may use Personal Data as follows:
	• Specific reason: If you provide Personal Data for a certain purpose, we may use the Personal Data in connection with the purpose for which it was provided. For instance, if you contact us by e-mail, we will use the Personal Data you provide to answer your question or resolve your problem and will respond to the email address from which the contact came.
	• Access and use: If you provide Personal Data in order to obtain access to or use of the Services or any functionality thereof, we will use your Personal Data to provide you with access to or use of the Services or functionality and to analyze your use of such Services or functionality. For instance, if you supply Personal Data relating to your identity or qualifications to use certain portions of the Services, we will use that information to make a decision as to granting you access to use such Services and to assess your ongoing qualification to use such services.
	• Internal business purposes: We may use your Personal Data for internal business purposes, including without limitation, to help us improve the content and functionality of the Services, to better understand our Users, to improve the Services, to protect against, identify or address wrongdoing, to enforce our Terms of Service, to manage your account and provide you with customer service, and to generally manage the Services and our businesses. <br><br>
	
	7. How you can access, update or delete your personal data? <br>
	You can request access to some of your Personal Data being stored by us. You can also ask us to correct, update or delete any inaccurate Personal Data that we process about them. If a Consumer initiates a data deletion request, NecessaryDevil/interface Infosoft Solutions. P. Ltd is authorized to delete or anonymize Personal Data of the requesting Consumer from the Services even if that means removing its availability to the Organizer through the Services. However, if you are a Consumer, you understand that even if NecessaryDevil/interface Infosoft Solutions. P. Ltd deletes or anonymizes your Personal Data upon your request or pursuant to this Policy, your Personal Data may still be available in the Organizer’s own databases if transmitted to the Organizer prior to NecessaryDevil/interface Infosoft Solutions. P. Ltd receiving or acting on any deletion or anonymization activity. We will consider and respond to all requests in accordance with applicable. <br><br>
	
	8. How long we retain your personal data? <br>
	We may retain your Personal Data as long as you are registered to use the Services. However, we may retain Personal Data for an additional period as is permitted or required under applicable laws. Even if we delete your Personal Data it may persist on backup or archival media for an additional period of time for legal, tax or regulatory reasons or for legitimate and lawful business purpose. <br><br>
	
	9. Any change we make in our privacy policy &amp; cookie settings will be notified on this page &amp; wherever necessary will be conveyed to you through e-mail. <br>
	
	10. By accepting NecessaryDevil/Interface Infosoft Solutions. P. Ltd privacy &amp; Terms you also adhere to Google’s Privacy &amp; Terms. <br>
</p> 		
<p class="mb-4">
</p><p class="mb-3">
</p><h2>App Privacy Policy</h2><p></p>
<p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
<p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.privacypolicies.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>
<h1>Interpretation and Definitions</h1>
<h2>Interpretation</h2>
<p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<h2>Definitions</h2>
<p>For the purposes of this Privacy Policy:</p>
<ul>
<li>
<p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
</li>
<li>
<p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
</li>
<li>
<p><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named Necessary Devil</p>
</li>
<li>
<p><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Interface Infosoft Solutions pvt ltd, plot 3, Aamchi colony, NDA pashan road, bavdhan.</p>
</li>
<li>
<p><strong>Country</strong> refers to: Maharashtra, India</p>
</li>
<li>
<p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
</li>
<li>
<p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
</li>
<li>
<p><strong>Service</strong> refers to the Application.</p>
</li>
<li>
<p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
</li>
<li>
<p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
</li>
<li>
<p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
</li>
</ul>
<h1>Collecting and Using Your Personal Data</h1>
<h2>Types of Data Collected</h2>
<h3>Personal Data</h3>
<p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
<ul>
<li>
<p>Email address</p>
</li>
<li>
<p>First name and last name</p>
</li>
<li>
<p>Phone number</p>
</li>
<li>
<p>Address, State, Province, ZIP/Postal code, City</p>
</li>
<li>
<p>Usage Data</p>
</li>
</ul>
<h3>Usage Data</h3>
<p>Usage Data is collected automatically when using the Service.</p>
<p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
<p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
<p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
<h3>Information Collected while Using the Application</h3>
<p>While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:</p>
<ul>
<li>Pictures and other information from your Device's camera and photo library</li>
</ul>
<p>We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company's servers and/or a Service Provider's server or it may be simply stored on Your device.</p>
<p>You can enable or disable access to this information at any time, through Your Device settings.</p>
<h2>Use of Your Personal Data</h2>
<p>The Company may use Personal Data for the following purposes:</p>
<ul>
<li>
<p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
</li>
<li>
<p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
</li>
<li>
<p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
</li>
<li>
<p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
</li>
<li>
<p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
</li>
<li>
<p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
</li>
<li>
<p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
</li>
<li>
<p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
</li>
</ul>
<p>We may share Your personal information in the following situations:</p>
<ul>
<li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
<li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
<li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
<li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
<li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
<li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
</ul>
<h2>Retention of Your Personal Data</h2>
<p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
<p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
<h2>Transfer of Your Personal Data</h2>
<p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
<p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
<p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
<h2>Disclosure of Your Personal Data</h2>
<h3>Business Transactions</h3>
<p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
<h3>Law enforcement</h3>
<p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
<h3>Other legal requirements</h3>
<p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
<ul>
<li>Comply with a legal obligation</li>
<li>Protect and defend the rights or property of the Company</li>
<li>Prevent or investigate possible wrongdoing in connection with the Service</li>
<li>Protect the personal safety of Users of the Service or the public</li>
<li>Protect against legal liability</li>
</ul>
<h2>Security of Your Personal Data</h2>
<p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
<h1>Children's Privacy</h1>
<p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
<p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
<h1>Links to Other Websites</h1>
<p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
<p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
<h1>Changes to this Privacy Policy</h1>
<p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
<p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</p>
<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
<h1>Contact Us</h1>
<p>If you have any questions about this Privacy Policy, You can contact us:</p>
<ul>
<li>
<p>By email: necessarydevil@interfaceinfosoft.com</p>
</li>
<li>
<p>By visiting this page on our website: <a href="https://necessarydevil.com" rel="external nofollow noopener" target="_blank">https://necessarydevil.com</a></p>
</li>
</ul>
<p></p>
</div>`
