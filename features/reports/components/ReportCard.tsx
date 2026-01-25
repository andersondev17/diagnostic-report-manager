import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { SplitTextAnimation } from "@/components/ui/split-text";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ReportCard = ({ id, name, size, type, date, color }: ReportCardProps) => {

  return (
    <article className="report-card" >
      <div className="flex justify-between items-center">
        <div className="subject-badge" style={{ backgroundColor: color }}>{type}</div>
        <button className="report-bookmark">
          <Image src="/icons/bookmark.svg" alt="Bookmark this report" width={12.5} height={15} />
        </button>
      </div>

      <SplitTextAnimation
        type="chars"
        trigger="load"
        stagger={0.06}
        duration={0.2}
        ease="back.out(1.4)"
        className="text-lg font-medium"
      >

        <h2 className="text-2xl font-bold">{name}</h2>
      </SplitTextAnimation>
      <p className="text-sm text-muted-foreground">{size}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="Report creation date"
          width={13.5}
          height={13.5}
        />
        <time dateTime={date}>{formatDate(date)}</time>

      </div>

      <Link href={`/reports/${id}`}  role="button" aria-label={`Open report ${name}`}>
        <InteractiveHoverButton  className="shadow-lg shadow-primary/20 w-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
          Open
        </InteractiveHoverButton>
      </Link>
    </article >
  )
}

export default ReportCard