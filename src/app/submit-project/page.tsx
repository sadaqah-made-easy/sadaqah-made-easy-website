import DonationForm from "@/components/DonationForm";
import SeoMeta from "@/partials/SeoMeta";

const submit = () => {
  return (
    <>
      <SeoMeta />

      <section className="section-sm">
        <div className="container">
          <DonationForm />
        </div>
      </section>
    </>
  );
};

export default submit;
