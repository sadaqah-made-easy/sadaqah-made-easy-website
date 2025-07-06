export const runtime = "edge";
import DonationForm from "@/components/DonationForm";
import GradientBg from "@/components/GradientBg";
import SeoMeta from "@/partials/SeoMeta";

const submit = () => {
  return (
    <>
      <SeoMeta />

      <section className="section-sm">
        <div className="container relative overflow-x-clip">
          <DonationForm />
          <GradientBg className="opacity-15" />
        </div>
      </section>
    </>
  );
};

export default submit;
