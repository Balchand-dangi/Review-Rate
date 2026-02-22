const Review = require('../models/Review');
const Company = require('../models/Company');

exports.addReview = async (req, res) => {
    try {
        // Use companyId from route params (Bug fix: was relying only on req.body)
        const review = new Review({ ...req.body, userId: req.user._id, companyId: req.params.companyId });
        await review.save();

        // Update company avg rating
        const reviews = await Review.find({ companyId: review.companyId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Company.findByIdAndUpdate(review.companyId, {
            avgRating: Math.round(avgRating * 10) / 10,
            reviewCount: reviews.length
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const { companyId } = req.params;         // route param se lo
        const { sort = 'newest' } = req.query;    // sort query param se lo
        const reviews = await Review.find({ companyId })
            .populate('userId', 'fullName')
            .sort(sort === 'rating' ? { rating: -1 } : { createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.likeReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ msg: 'Review not found' });

        const userId = req.user._id.toString();
        const alreadyLiked = review.likes.some(like => like.userId.toString() === userId);

        if (alreadyLiked) {
            // Unlike: remove the user's like
            review.likes = review.likes.filter(like => like.userId.toString() !== userId);
        } else {
            // Like: add the user's like
            review.likes.push({ userId: req.user._id });
        }

        await review.save();
        res.json({ likes: review.likes.length, isLiked: !alreadyLiked });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
