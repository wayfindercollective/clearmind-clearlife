/**
 * Testimonial assets. Three video clients, distributed one per section:
 *   greg  -> "What this is"  (portrait 9:16, short endorsement of Dan)
 *   jim   -> "How it works"  (16:9, hospitality owner - method/rebuild story)
 *   grant -> "Results"       (16:9, car-dealership owner - full arc, featured)
 * Andrew's call recording was dropped (lower production, superseded by Grant/Jim).
 * First-name captions only, for privacy.
 */

export type VideoTestimonial = {
  name: string;
  caption: string;
  src: string;
  poster: string;
  aspect: "portrait" | "landscape";
};

export const gregTestimonial: VideoTestimonial = {
  name: "Greg",
  caption: "Greg, client",
  src: "/testimonials/greg.mp4",
  poster: "/testimonials/greg-poster.jpg",
  aspect: "portrait",
};

export const jimTestimonial: VideoTestimonial = {
  name: "Jim",
  caption: "Jim, client",
  src: "/testimonials/jim.mp4",
  poster: "/testimonials/jim-poster.jpg",
  aspect: "landscape",
};

export const grantTestimonial: VideoTestimonial = {
  name: "Grant",
  caption: "Grant, client",
  src: "/testimonials/grant.mp4",
  poster: "/testimonials/grant-poster.jpg",
  aspect: "landscape",
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
