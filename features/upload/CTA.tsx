import Image from 'next/image';
import Link from 'next/link';

const CTA = () => {

  return (
    <section className="cta-section" aria-labelledby="upload-heading">
      <h2 className="text-3xl font-bold">Upload New Report</h2>
      <p className="text-muted-foreground">
          click on the button below to upload a new report
      </p>

      
      <button className="btn-primary mt-6">
        <Image src="/icons/plus.svg" alt="" width={12} height={12} />
        <Link href="/reports/new">
          <span>Diagnose a New Report</span>
        </Link>
      </button>
    </section>
  );
};

export default CTA;