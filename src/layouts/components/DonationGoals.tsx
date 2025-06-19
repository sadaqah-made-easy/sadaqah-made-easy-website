import CopyToClipboardTooltip from "@/components/CopyToClipboardTooltip";
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
          <h3 className="h6 text-text-dark/80 mb-4">Donations</h3>
          <div className="mb-1 border border-border p-4">
            <p className="text-xs text-text-light">Goals</p>
            <p className="h5">{donationGoals.amount}</p>
          </div>
        </div>
      )}

      {shouldShowPaymentMethods && (
        <div className="mb-6">
          <h3 className="h6 text-text-dark/80 mb-4">Donation methods</h3>

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
                        <span className="text-xs text-text-light">
                          Ref: {method.reference}
                        </span>
                      </CopyToClipboardTooltip>
                    )}
                    {method.accountType && (
                      <CopyToClipboardTooltip
                        text={method.accountType}
                        fieldId={`mobile_accountType_${index}`}
                      >
                        <span className="text-xs text-text-light">
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
              <div className="w-full">
                <h5 className="text-base font-normal mb-2">
                  {donationGoals.payment_methods.bank.type}
                </h5>
                <div className="font-medium flex flex-col gap-1 items-start w-full">
                  {donationGoals.payment_methods.bank.details.account && (
                    <CopyToClipboardTooltip
                      text={donationGoals.payment_methods.bank.details.account}
                      fieldId="bank_account"
                      className="w-full text-left"
                    >
                      <div className="text-left w-full break-words">
                        <span className="font-normal text-sm text-text-light">
                          A/C:
                        </span>{" "}
                        {donationGoals.payment_methods.bank.details.account}
                      </div>
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.name && (
                    <CopyToClipboardTooltip
                      text={donationGoals.payment_methods.bank.details.name}
                      fieldId="bank_name"
                      className="w-full text-left"
                    >
                      <div className="text-left w-full break-words">
                        <span className="font-normal text-sm text-text-light">
                          Name:
                        </span>{" "}
                        {donationGoals.payment_methods.bank.details.name}
                      </div>
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.accountName && (
                    <CopyToClipboardTooltip
                      text={
                        donationGoals.payment_methods.bank.details.accountName
                      }
                      fieldId="bank_accountName"
                      className="w-full text-left"
                    >
                      <div className="text-left w-full break-words">
                        <span className="font-normal text-sm text-text-light">
                          Account Name:
                        </span>{" "}
                        {donationGoals.payment_methods.bank.details.accountName}
                      </div>
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.branch && (
                    <CopyToClipboardTooltip
                      text={donationGoals.payment_methods.bank.details.branch}
                      fieldId="bank_branch"
                      className="w-full text-left"
                    >
                      <div className="text-left w-full break-words">
                        <span className="font-normal text-sm text-text-light">
                          Branch:
                        </span>{" "}
                        {donationGoals.payment_methods.bank.details.branch}
                      </div>
                    </CopyToClipboardTooltip>
                  )}
                  {donationGoals.payment_methods.bank.details.reference && (
                    <CopyToClipboardTooltip
                      text={
                        donationGoals.payment_methods.bank.details.reference
                      }
                      fieldId="bank_reference"
                      className="w-full text-left"
                    >
                      <div className="text-left w-full break-words">
                        <span className="font-normal text-sm text-text-light">
                          Reference:
                        </span>{" "}
                        {donationGoals.payment_methods.bank.details.reference}
                      </div>
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
