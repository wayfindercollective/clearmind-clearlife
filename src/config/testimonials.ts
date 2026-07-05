/**
 * Testimonial assets from Dan's zip. Both videos re-encoded with their baked-in
 * black bars cropped off (scripts: ffmpeg crop, see git history):
 *   greg.mp4   -> true portrait 720x1280 (9:16). Burned captions show he's talking
 *                 about working with Dan ("down to earth", "knowledgeable", "recommend")
 *                 -> placed beside the "What this is" copy.
 *   andrew.mp4 -> ultrawide 1920x540 (32:9) two-up call with Dan (no captions; audio
 *                 not transcribed) -> full-width band in the Results section.
 * No age/profession in captions - privacy, per client.
 */

export type VideoTestimonial = {
  name: string;
  caption: string;
  src: string;
  /** Poster frame - browsers don't reliably paint a first frame with preload="metadata". */
  poster: string;
  /** Display frame matching the file's true aspect. */
  aspect: "portrait" | "band";
};

export const gregTestimonial: VideoTestimonial = {
  name: "Greg Atkinson",
  caption: "Greg Atkinson, client",
  src: "/testimonials/greg.mp4",
  poster: "/testimonials/greg-poster.jpg",
  aspect: "portrait",
};

export const andrewTestimonial: VideoTestimonial = {
  name: "Andrew H.",
  caption: "Andrew H., on a call with Dan",
  src: "/testimonials/andrew.mp4",
  poster: "/testimonials/andrew-poster.jpg",
  aspect: "band",
};

/** Screenshot / written testimonials for the social-proof marquee. */
export const writtenTestimonials: string[] = [
  "/testimonials/w1.png",
  "/testimonials/w2.png",
  "/testimonials/w3.png",
  "/testimonials/w4.png",
  "/testimonials/w5.png",
  "/testimonials/w6.png",
  "/testimonials/w7.png",
  "/testimonials/w8.png",
  "/testimonials/w9.png",
  "/testimonials/w10.png",
];
