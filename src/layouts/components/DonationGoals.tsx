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
        <div className="mb-6">
          <h3 className="text-sm font-medium text-dark/80 mb-2">Donations</h3>
          <div className="mb-1 border p-3">
            <p className="text-xs text-light">Goals</p>
            <p className="text-lg font-bold">{donationGoals.amount}</p>
          </div>
        </div>
      )}

      {/* Payment Methods Section */}
      {donationGoals?.payment_methods.mobileBanking.length > 0 &&
        donationGoals?.payment_methods.bank && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-dark/80 mb-3">
              Donation methods
            </h3>

            {/* Mobile Banking Methods */}
            {donationGoals?.payment_methods.mobileBanking.map(
              (method, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 mb-3 p-3 bg-gray-50"
                >
                  <Image
                    src={method.image}
                    alt={method.type}
                    width={40}
                    height={40}
                  />
                  <div>
                    <h5 className="text-sm font-medium">{method.type}</h5>
                    <p className="text-primary">{method.number}</p>
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
              <div className="flex items-start gap-3 p-3 bg-gray-50">
                <Image
                  src={donationGoals?.payment_methods.bank.image}
                  alt="Bank"
                  width={40}
                  height={40}
                />
                <div>
                  <h5 className="text-sm font-medium">
                    {donationGoals?.payment_methods.bank.type}
                  </h5>
                  <div className="text-xs text-light">
                    <p className="text-primary text-base">
                      A/C: {donationGoals?.payment_methods.bank.details.account}
                    </p>
                    <p>
                      Name: {donationGoals?.payment_methods.bank.details.name}
                    </p>
                    <p>
                      Account Name:{" "}
                      {donationGoals?.payment_methods.bank.details.accountName}
                    </p>
                    <p>
                      Branch:{" "}
                      {donationGoals?.payment_methods.bank.details.branch}
                    </p>
                    <p>
                      Reference:{" "}
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
