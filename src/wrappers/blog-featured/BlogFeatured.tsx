import clsx from 'clsx';
import React from 'react';
import BlogFeaturedSingle from '../../components/blog-featured/BlogFeaturedSingle';
import SectionTitle from '../../components/section-title/SectionTitle';
import blogFeaturedData from '../../data/blog-featured/blog-featured.json';

interface BlogFeaturedProps {
    spaceBottomClass?: string;
    spaceTopClass?: string;
}
const BlogFeatured: React.FC<BlogFeaturedProps> = ({
    spaceTopClass,
    spaceBottomClass
}) => {
    return (
        <div className={clsx('blog-area', spaceTopClass, spaceBottomClass)}>
            <div className="container">
                <SectionTitle
                    titleText="OUR BLOG"
                    positionClass="text-center"
                    spaceClass="mb-55"
                />
                <div className="row">
                    {blogFeaturedData?.map((singlePost) => (
                        <div className="col-lg-4 col-sm-6" key={singlePost.id}>
                            <BlogFeaturedSingle singlePost={singlePost} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogFeatured;
