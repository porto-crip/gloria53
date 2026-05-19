import Link from "next/link";

import styles from "./Card.module.css";
import { ArrowRight } from "@/icons/ArrowRight";

const CardNews = ({
  date,
  image,
  imageAlt,
  title,
  excerpt,
  slug,
  label = "Новости",
}) => {
  const href = slug ? `/news/${slug}` : "#";

  return (
    <article className="group grid h-[500px] overflow-hidden rounded-3xl border border-dark10 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-dark15 hover:shadow-lg">
      <Link href={href} className="grid h-full grid-rows-[auto_1fr]">
        <div className="relative overflow-hidden bg-dark10">
          <img
            className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-[220px] md:h-[240px]"
            src={image}
            alt={imageAlt || title}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-dark/15 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>

        <div className="grid grid-rows-[auto_1fr_auto] gap-2 p-5 sm:p-6">
          <div className="grid gap-3">
            <div className="flex items-center gap-3 text-xs font-medium text-dark50">
              <span className="text-accent">
                {label}
              </span>

              <span className="h-1 w-1 rounded-full bg-dark25" />

              <time>
                {date}
              </time>
            </div>

            <h3
              className={`line-clamp-2 min-h-[3.5rem] text-xl font-medium leading-tight text-dark transition group-hover:text-accent ${styles.titleTruncate}`}
            >
              {title}
            </h3>

            {excerpt ? (
              <p
                className={`line-clamp-3 text-sm leading-relaxed text-dark50 ${styles.descriptionTruncate}`}
              >
                {excerpt}
              </p>
            ) : null}
          </div>

          <div />

          <div className="flex items-center justify-between gap-4">
            <section className="flex h-10 w-30 items-center justify-center gap-3 rounded-full bg-dark10 px-4 transition group-hover:bg-accent group-hover:text-white">
              <span className="text-sm font-medium text-dark80 duration-300 group-hover:text-white">
                Читать
              </span>

              <ArrowRight className="h-4.5 w-4.5 text-dark/50 transition duration-300 group-hover:translate-x-px group-hover:text-white" />
            </section>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CardNews;
