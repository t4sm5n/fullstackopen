let token = null;

const blogs = [
	{
		id: "5b77d2a45b17842523f71bd8",
		title: "API:t käytännössä - selkokielinen katsaus",
		author: "Jani Haglund",
		url: "https://www.alfame.com/blog/apit-kaytannossa-selkokielinen-katsaus",
		likes: 42,
		user: {
			_id: "5a437a9e514ab7f168ddf138",
			username: "tmakinen",
			name: "Tuomas Mäkinen"
		}
	},
	{
		id: "5b77d2a45b17842523f71bd9",
		title: "Estä liiketoimintanne riskit prosessien automatisoinnilla!",
		author: "Janne Tirkkonen",
		url: "https://www.alfame.com/blog/esta-liiketoimintanne-riskit-prosessien-automatisoinnilla",
		likes: 36
	}
];

const getAll = () => {
	return Promise.resolve(blogs)
};

const setToken = (newToken) => {};

export default { getAll, setToken, blogs };