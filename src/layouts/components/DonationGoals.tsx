import CopyToClipboardTooltip from "@/components/CopyToClipboardTooltip"; // Import the reusable tooltip
import { TDonationGoals } from "@/types";
import Image from "next/image";

const DonationGoals = ({
  donationGoals,
}: {
  donationGoals: TDonationGoals;
}) => {
  const hasMobileBanking = donationGoals?.payment_methods?.mobile_banking?.some(
    (method) => method.number || method.reference || method.accountType,
  );

  const hasBank =
    donationGoals?.payment_methods?.bank?.details &&
    Object.values(donationGoals.payment_methods.bank.details).some(
      (value) => value,
    );

  const shouldShowPaymentMethods = hasMobileBanking || hasBank;

  return (
    <>
      {donationGoals?.enable && donationGoals?.amount && (
        <div className="mb-8">
          <h3 className="h6 text-dark/80 mb-4">Donations</h3>
          <div className="mb-1 border p-4">
            <p className="text-xs text-light">Goals</p>
            <p className="h5">{donationGoals.amount}</p>
          </div>
        </div>
      )}

      {shouldShowPaymentMethods && (
        <div className="mb-6">
          <h3 className="h6 text-dark/80 mb-4">Donation methods</h3>

          {donationGoals?.payment_methods?.mobile_banking?.map(
            (method, index) => {
              const hasDetails =
                method.number || method.reference || method.accountType;
              if (!hasDetails) return null;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 mb-4 p-4 bg-gray-50"
                >
                  <Image
                    src={method.image}
                    alt={method.type}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col items-start">
                    <h5 className="text-base font-normal mb-2">
                      {method.type}
                    </h5>
                    {method.number && (
                      <CopyToClipboardTooltip
                        text={method.number}
                        fieldId={`mobile_number_${index}`}
                      >
                        {method.number}
                      </CopyToClipboardTooltip>
                    )}
                    {method.reference && (
                      <CopyToClipboardTooltip
                        text={method.reference}
                        fieldId={`mobile_reference_${index}`}
                      >
                        <span className="text-xs text-light">
                          Ref: {method.reference}
                        </span>
                      </CopyToClipboardTooltip>
                    )}
                    {method.accountType && (
                      <CopyToClipboardTooltip
                        text={method.accountType}
                        fieldId={`mobile_accountType_${index}`}
                      >
                        <span className="text-xs text-light">
                          Type: {method.accountType}
                        </span>
                      </CopyToClipboardTooltip>
                    )}
                  </div>
                </div>
              );
            },
          )}

          {hasBank && (
            <div className="flex items-start gap-4 p-4 bg-gray-50">
              <Image
                src={donationGoals.payment_methods.bank.image}
                alt="Bank"
                width={40}
                height={40}
              />
              <div>
                <h5 className="text-base font-normal mb-2">
                  {donationGoals.payment_methods.bank.type}
                </h5>
                <div className="font-medium flex flex-col items-start">
                  {donationGoals.payment_methods.bank.details.account && (
                    <CopyToClipboardTooltip
                      text={donationGoals.payment_methods.bank.details.account}
                      fieldId="bank_account"
                    >
                      <span className="font-normal text-sm">A/C:</span>{" "}
                      {donationGoals.payment_methods.bank.details.account}
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.name && (
                    <CopyToClipboardTooltip
                      text={donationGoals.payment_methods.bank.details.name}
                      fieldId="bank_name"
                    >
                      <span className="font-normal text-sm">Name:</span>{" "}
                      {donationGoals.payment_methods.bank.details.name}
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.accountName && (
                    <CopyToClipboardTooltip
                      text={
                        donationGoals.payment_methods.bank.details.accountName
                      }
                      fieldId="bank_accountName"
                    >
                      <span className="font-normal text-sm">Account Name:</span>{" "}
                      {donationGoals.payment_methods.bank.details.accountName}
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.branch && (
                    <CopyToClipboardTooltip
                      text={donationGoals.payment_methods.bank.details.branch}
                      fieldId="bank_branch"
                    >
                      <span className="font-normal text-sm">Branch:</span>{" "}
                      {donationGoals.payment_methods.bank.details.branch}
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.reference && (
                    <CopyToClipboardTooltip
                      text={
                        donationGoals.payment_methods.bank.details.reference
                      }
                      fieldId="bank_reference"
                    >
                      <span className="font-normal text-sm">Reference:</span>{" "}
                      {donationGoals.payment_methods.bank.details.reference}
                    </CopyToClipboardTooltip>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DonationGoals;
