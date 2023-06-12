import Feed from '@components/Feed';

const Home = () => {
  return (
    <div>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & Share
          <br />
          <span className="blue_gradient">AI-Powered Contents</span>
        </h1>
        <p className="desc text-center">
          Builder Content is an open-source AI tool for modern world to
          discover, create and share creative contents.
        </p>
      </section>
      <Feed />
    </div>
  );
};

export default Home;
