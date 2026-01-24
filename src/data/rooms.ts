export type Room = {
	id: string;
	title: string;
	amenities: string[];
	galleryFolder: string;
	imageCount: number;
};

export const rooms: Room[] = [
	{
		id: "deluxe_double",
		title: "Deluxe Double Room",
		amenities: ["AC", "Hot Water", "Private Bathroom"],
		galleryFolder: "deluxe_double",
		imageCount: 5,
	},
	{
		id: "double_non_ac",
		title: "Double Room Non AC",
		amenities: ["Non AC", "Private Bathroom"],
		galleryFolder: "double_non_ac",
		imageCount: 4,
	},
	{
		id: "family_room_1",
		title: "Family Room",
		amenities: ["AC", "Hot Water", "Private Bathroom"],
		galleryFolder: "family_room_1",
		imageCount: 5,
	},
	{
		id: "family_room_2",
		title: "Family Room",
		amenities: ["AC", "Hot Water", "Private Bathroom"],
		galleryFolder: "family_room_2",
		imageCount: 4,
	},
];

