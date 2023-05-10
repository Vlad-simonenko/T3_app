import { PrismaClient } from "@prisma/client";
import express from "express";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  console.log("3213213");

  return {
    props: { posts },
  };
}
