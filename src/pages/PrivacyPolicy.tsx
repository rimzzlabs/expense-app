import { formatDate, twclsx } from '@/utils'

import { HiArrowSmLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const PrivacyPolicyPage: React.FunctionComponent = () => {
  return (
    <div
      className={twclsx(
        'pb-10 max-w-prose',
        '[&>:is(p,ul):not(:last-child)]:mb-[0.725em]',
        '[&>:is(h1,h2)]:mb-[0.875em] [&>:is(h1,h2):not(:first-child)]:mt-[0.675em]'
      )}
    >
      <Link
        to='/signin'
        className={twclsx(
          'inline-flex items-center gap-2.5',
          'hover:underline',
          'text-primary-5 dark:text-primary-4'
        )}
      >
        <HiArrowSmLeft />
        <span>Back</span>
      </Link>

      <h1>Privacy Policy</h1>
      <p>
        Rizki M Citra built the ExpenseApp app as an Open Source app. This SERVICE is provided by
        Rizki M Citra at no cost and is intended for use as is.
      </p>
      <p>
        This page is used to inform visitors regarding my policies with the collection, use, and
        disclosure of Personal Information if anyone decided to use my Service.
      </p>
      <p>
        If you choose to use my Service, then you agree to the collection and use of information in
        relation to this policy. The Personal Information that I collect is used for providing and
        improving the Service. I will not use or share your information with anyone except as
        described in this Privacy Policy.
      </p>
      <p>
        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,
        which are accessible at ExpenseApp unless otherwise defined in this Privacy Policy.
      </p>
      <h2>Information Collection and Use</h2>

      <p>
        For a better experience, while using our Service, I may require you to provide us with
        certain personally identifiable information, including but not limited to{' '}
        <strong>Email</strong>, <strong>Username</strong>, <strong>Name</strong>,{' '}
        <strong>Profile picture</strong>.
      </p>
      <p>
        The information that I request will be retained on your device and is not collected by me in
        any way.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies are files with a small amount of data that are commonly used as anonymous unique
        identifiers. These are sent to your browser from the websites that you visit and are stored
        on your device&apos;s internal memory.
      </p>
      <p>
        This Service does not use these <strong>“cookies”</strong> explicitly. However, the app may
        use third-party code and libraries that use <strong>“cookies”</strong> to collect
        information and improve their services. You have the option to either accept or refuse these
        cookies and know when a cookie is being sent to your device.
      </p>

      <h2>Service Providers</h2>
      <p>I may employ third-party companies and individuals due to the following reasons:</p>
      <ul className='list-disc list-inside'>
        <li>To facilitate our Service</li>
        <li>To provide the Service on our behalf</li>
        <li>To perform Service-related services</li>
        <li>To assist us in analyzing how our Service is used</li>
      </ul>
      <p>
        I want to inform users of this Service that these third parties have access to their
        Personal Information. The reason is to perform the tasks assigned to them on our behalf.
        However, they are obligated not to disclose or use the information for any other purpose.
      </p>

      <h2>Security</h2>
      <p>
        I value your trust in providing your Personal Information, thus we are striving to use
        commercially acceptable means of protecting it.
      </p>
      <p>
        But remember that no method of transmission over the internet, or method of electronic
        storage is 100% secure and reliable, and I cannot guarantee its absolute security.
      </p>

      <h2>Links to Other Sites</h2>
      <p>
        This Service may contain links to other sites. If you click on a third-party link, you will
        be directed to that site. Note that these external sites are not operated by me.
      </p>
      <p>
        Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no
        control over and assume no responsibility for the content, privacy policies, or practices of
        any third-party sites or services.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        I may update our Privacy Policy from time to time. Thus, you are advised to review this page
        periodically for any changes. I will notify you of any changes by posting the new Privacy
        Policy on this page. This policy is effective as of {formatDate('2022-07-27')}
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact
        me at{' '}
        <a className='text-primary-5 dark:text-primary-4' href='mailto:rmaulana.citra@gmail.com'>
          rmaulana.citra@gmail.com
        </a>
        .
      </p>
    </div>
  )
}

export default PrivacyPolicyPage
