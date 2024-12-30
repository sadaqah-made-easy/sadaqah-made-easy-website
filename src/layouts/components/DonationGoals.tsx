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
                  />
                  <div className="space-y-2">
                    <h5 className="text-base font-normal">{method.type}</h5>
                    {method.number && (
                      <p className="font-medium">{method.number}</p>
                    )}
                    {method.reference && (
                      <p className="text-xs text-light">
                        Ref: {method.reference}
                      </p>
                    )}
                    {method.accountType && (
                      <p className="text-xs text-light">
                        Type: {method.accountType}
                      </p>
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
                <div className="font-medium space-y-2">
                  {donationGoals.payment_methods.bank.details.account && (
                    <p>
                      <span className="font-normal text-sm">A/C:</span>{" "}
                      {donationGoals.payment_methods.bank.details.account}
                    </p>
                  )}
                  {donationGoals.payment_methods.bank.details.name && (
                    <p>
                      <span className="font-normal text-sm">Name:</span>{" "}
                      {donationGoals.payment_methods.bank.details.name}
                    </p>
                  )}
                  {donationGoals.payment_methods.bank.details.accountName && (
                    <p>
                      <span className="font-normal text-sm">Account Name:</span>{" "}
                      {donationGoals.payment_methods.bank.details.accountName}
                    </p>
                  )}
                  {donationGoals.payment_methods.bank.details.branch && (
                    <p>
                      <span className="font-normal text-sm">Branch:</span>{" "}
                      {donationGoals.payment_methods.bank.details.branch}
                    </p>
                  )}
                  {donationGoals.payment_methods.bank.details.reference && (
                    <p>
                      <span className="font-normal text-sm">Reference:</span>{" "}
                      {donationGoals.payment_methods.bank.details.reference}
                    </p>
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
