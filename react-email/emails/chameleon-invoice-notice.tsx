import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ChameleonNoticeEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `http://${process.env.VERCEL_URL}`
  : '';

export const ChameleonNoticeEmail = ({
  username,
  invitedByUsername,
  invitedByEmail,
  teamName,
  inviteLink,
  inviteFromLocation,
}: ChameleonNoticeEmailProps) => {
  const previewText = `Invoice from ${invitedByUsername}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-100 px-2 font-sans">
          <Container className="mx-auto my-[30px] bg-white max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/bicycle-collective-logo.png`}
                width="150"
                height="200"
                alt="Bicycle Collective"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Invoice from <strong>{teamName}</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Dear {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              You have received an invoice from <strong>{invitedByUsername}</strong>{' '}
              (<Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>).
            </Text>
            <Section className="my-[20px] p-[15px] border border-[#eaeaea] rounded">
              <Text className="text-[14px] text-black leading-[24px]">
                Invoice #: INV-2024-001
              </Text>
              <Row>
                <Column>
                  <Text className="text-[14px] text-black leading-[24px]">
                    Due Date: {new Date().toLocaleDateString()}
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="text-[14px] text-black leading-[24px]">
                    Amount Due: $0.00
                  </Text>
                </Column>
              </Row>
              <Hr className="my-[15px] border border-[#eaeaea] border-dashed" />
            </Section>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#22c55e] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                View Invoice
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              If the button above doesn't work, copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-green-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invoice was sent to <span className="text-black">{username}</span> from{' '}
              <span className="text-black">{inviteFromLocation}</span>. If you were not expecting
              this invoice, please contact us immediately by replying to this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ChameleonNoticeEmail.PreviewProps = {
  username: 'alanturing',
  invitedByUsername: 'Alan',
  invitedByEmail: 'slc@bicyclecollective.com',
  teamName: 'Bicycle Collective',
  inviteLink: 'https://chameleoninvoice.com/bicycle-collective/invoice/INV-2024-001',
  inviteFromIp: '204.13.186.218',
  inviteFromLocation: 'Salt Lake City, Utah',
} as ChameleonNoticeEmailProps;

export default ChameleonNoticeEmail;
