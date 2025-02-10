import { Post } from "../types/types";

export const mockData: Post[] = [
  {
    id: "post1",
    text: "Exploring the beautiful Yosemite National Park 🌲",
    author: "Alice",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=500&q=60",
    comments: [
      {
        id: "comment1",
        text: "Wow! Yosemite looks amazing.",
        author: "Bob",
        replies: [
          {
            id: "reply1",
            text: "It really is! You should visit someday.",
            author: "Alice",
            replies: [],
          },
        ],
      },
      {
        id: "comment2",
        text: "The scenery is stunning! Did you hike there?",
        author: "Charlie",
        replies: [],
      },
    ],
  },
  {
    id: "post2",
    text: "Tried the best coffee shop downtown ☕!",
    author: "David",
    imageUrl:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=500&q=60",
    comments: [
      {
        id: "comment3",
        text: "What did you order there?",
        author: "Emma",
        replies: [
          {
            id: "reply2",
            text: "Their signature caramel latte. So good!",
            author: "David",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "post3",
    text: "Caught a spectacular sunset by the beach 🌅",
    author: "Olivia",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60",
    comments: [
      {
        id: "comment4",
        text: "That's a postcard-worthy picture!",
        author: "Sophia",
        replies: [
          {
            id: "reply3",
            text: "Thank you! The colors were unreal.",
            author: "Olivia",
            replies: [],
          },
        ],
      },
    ],
  },

  {
    id: "post5",
    text: "Visited the ancient ruins of Petra 🏺",
    author: "Isabella",
    imageUrl:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=500&q=60",
    comments: [
      {
        id: "comment6",
        text: "Petra is on my travel bucket list!",
        author: "James",
        replies: [
          {
            id: "reply5",
            text: "You should definitely go! It's breathtaking.",
            author: "Isabella",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "post6",
    text: "Binge-watching my favorite series this weekend 🎥",
    author: "Ethan",
    imageUrl:
      "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?auto=format&fit=crop&w=500&q=60",
    comments: [
      {
        id: "comment7",
        text: "What show are you watching?",
        author: "Ava",
        replies: [
          {
            id: "reply6",
            text: "Stranger Things! So thrilling.",
            author: "Ethan",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "post7",
    text: "Trekking through the Himalayas 🏔️",
    author: "Charlotte",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=500&q=60",
    comments: [
      {
        id: "comment8",
        text: "That must be such an adventure!",
        author: "Mason",
        replies: [
          {
            id: "reply7",
            text: "Absolutely, but exhausting too!",
            author: "Charlotte",
            replies: [],
          },
        ],
      },
    ],
  },
];
