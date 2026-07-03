/** Testimonial assets from Dan's zip (extracted into /public/testimonials during the build). */

export type VideoTestimonial = {
  name: string;
  role?: string;
  src: string;
  poster?: string;
};

// Both clips are portrait (Andrew is 1536x1920 = 4:5). No poster set — the tile shows
// each video's own first frame (the previous greg-poster was a different, landscape clip).
export const videoTestimonials: VideoTestimonial[] = [
  { name: "Greg Atkinson", role: "Business owner", src: "/testimonials/greg.mp4" },
  { name: "Andrew H.", role: "Professional", src: "/testimonials/andrew.mp4" },
];

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
