import { TDonationGoals } from "@/types";
import Image from "next/image";

const DonationGoals = ({
  donationGoals,
}: {
  donationGoals: TDonationGoals;
}) => {
  return (
    <>
      {donationGoals && donationGoals.enable && (
        <div className="mb-8">
          <h3 className="h6 text-dark/80 mb-4">Donations</h3>
          <div className="mb-1 border p-4">
            <p className="text-xs text-light">Goals</p>
            <p className="h5">{donationGoals.amount}</p>
          </div>
        </div>
      )}

      {/* Payment Methods Section */}
      {donationGoals?.payment_methods.mobile_banking.length > 0 &&
        donationGoals?.payment_methods.bank && (
          <div className="mb-6">
            <h3 className="h6 text-dark/80 mb-4">Donation methods</h3>

            {/* Mobile Banking Methods */}
            {donationGoals?.payment_methods.mobile_banking.map(
              (method, index) => (
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
                    <p className="font-medium">{method.number}</p>
                    <p className="text-xs text-light">
                      Ref: {method.reference}
                    </p>
                    <p className="text-xs text-light">
                      Type: {method.accountType}
                    </p>
                  </div>
                </div>
              ),
            )}

            {/* Bank Details */}
            {donationGoals?.payment_methods.bank && (
              <div className="flex items-start gap-4 p-4 bg-gray-50">
                <Image
                  src={donationGoals?.payment_methods.bank.image}
                  alt="Bank"
                  width={40}
                  height={40}
                />
                <div>
                  <h5 className="text-base font-normal mb-2">
                    {donationGoals?.payment_methods.bank.type}
                  </h5>
                  <div className="font-medium space-y-2">
                    <p>
                      <span className="font-normal text-sm"> A/C:</span>{" "}
                      {donationGoals?.payment_methods.bank.details.account}
                    </p>
                    <p>
                      <span className="font-normal text-sm"> Name:</span>{" "}
                      {donationGoals?.payment_methods.bank.details.name}
                    </p>
                    <p>
                      <span className="font-normal text-sm">
                        Account Name:{" "}
                      </span>
                      {donationGoals?.payment_methods.bank.details.accountName}
                    </p>
                    <p>
                      <span className="font-normal text-sm"> Branch: </span>
                      {donationGoals?.payment_methods.bank.details.branch}
                    </p>
                    <p>
                      <span className="font-normal text-sm"> Reference: </span>
                      {donationGoals?.payment_methods.bank.details.reference}
                    </p>
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
