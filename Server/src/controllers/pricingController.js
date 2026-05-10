const PricingPackage = require('../models/PricingPackage');
const PricingSettings = require('../models/PricingSettings');

// Initial Seed Data
const seedData = [
  {
    serviceType: "template", name: "Single Template", label: "Starter", icon: "📄",
    price: "40", priceUnit: "/project", isPopular: false, ctaStyle: "outline",
    ctaText: "Get Started →", sortOrder: 1, isVisible: true,
    description: "Perfect for a one-off newsletter or automated welcome email.",
    features: [
      { text: "1 Custom HTML Email Template", included: true, order: 1 },
      { text: "Mobile Responsive Design", included: true, order: 2 },
      { text: "Tested in 20+ Email Clients", included: true, order: 3 },
      { text: "Gmail & Outlook Compatible", included: true, order: 4 },
      { text: "1 Revision Round", included: true, order: 5 },
      { text: "2-Day Turnaround", included: true, order: 6 },
      { text: "ESP Integration", included: false, order: 7 },
      { text: "Priority Support", included: false, order: 8 }
    ]
  },
  {
    serviceType: "template", name: "Standard Package", label: "Best Value",
    badgeText: "Most Popular", icon: "🚀", price: "149", priceUnit: "/project",
    isPopular: true, ctaStyle: "primary", ctaText: "Get Started →", sortOrder: 2, isVisible: true,
    description: "The most popular choice for growing businesses and agencies.",
    features: [
      { text: "3 Custom HTML Email Templates", included: true, order: 1 },
      { text: "1 Professional HTML Signature", included: true, order: 2 },
      { text: "Mobile Responsive Design", included: true, order: 3 },
      { text: "Tested in 90+ Email Clients", included: true, order: 4 },
      { text: "Platform Integration (Klaviyo/Mailchimp)", included: true, order: 5 },
      { text: "3 Revision Rounds", included: true, order: 6 },
      { text: "Premium Support", included: true, order: 7 },
      { text: "48hr Turnaround", included: true, order: 8 }
    ]
  },
  {
    serviceType: "template", name: "Enterprise Custom", label: "Enterprise", icon: "🏢",
    price: "Custom", priceUnit: "", isPopular: false, ctaStyle: "custom",
    ctaText: "Contact Us →", sortOrder: 3, isVisible: true,
    description: "Full service email architecture for complex design systems and agencies.",
    features: [
      { text: "Unlimited Custom Templates", included: true, order: 1 },
      { text: "Modular Email Design System", included: true, order: 2 },
      { text: "Dedicated Account Manager", included: true, order: 3 },
      { text: "Unlimited Revisions", included: true, order: 4 },
      { text: "All ESPs Supported", included: true, order: 5 },
      { text: "Priority Support", included: true, order: 6 },
      { text: "Custom Turnaround SLA", included: true, order: 7 },
      { text: "Ongoing Maintenance Option", included: true, order: 8 }
    ]
  },
  {
    serviceType: "signature", name: "Simple Signature", label: "Basic", icon: "✍",
    price: "25", priceUnit: "/project", isPopular: false, ctaStyle: "outline",
    ctaText: "Get Started →", sortOrder: 1, isVisible: true,
    description: "Clean professional signature with logo, contact details and social links.",
    features: [
      { text: "Logo + Contact Info", included: true, order: 1 },
      { text: "Social Media Icons", included: true, order: 2 },
      { text: "Gmail & Outlook Compatible", included: true, order: 3 },
      { text: "1 Revision Round", included: true, order: 4 },
      { text: "Clickable Banner", included: false, order: 5 }
    ]
  },
  {
    serviceType: "signature", name: "Banner Signature", label: "Professional",
    badgeText: "Most Popular", icon: "⚡", price: "65", priceUnit: "/project",
    isPopular: true, ctaStyle: "primary", ctaText: "Get Started →", sortOrder: 2, isVisible: true,
    description: "Full signature with clickable promotional banner and social proof.",
    features: [
      { text: "Logo + Contact + Social", included: true, order: 1 },
      { text: "Clickable Promotional Banner", included: true, order: 2 },
      { text: "Gmail, Outlook, Apple Mail", included: true, order: 3 },
      { text: "Mobile Responsive", included: true, order: 4 },
      { text: "3 Revision Rounds", included: true, order: 5 },
      { text: "24hr Delivery", included: true, order: 6 }
    ]
  },
  {
    serviceType: "signature", name: "Team Package", label: "Enterprise", icon: "🏢",
    price: "Custom", priceUnit: "", isPopular: false, ctaStyle: "custom",
    ctaText: "Contact Us →", sortOrder: 3, isVisible: true,
    description: "Consistent branded signatures for your entire team or company.",
    features: [
      { text: "5+ Signatures", included: true, order: 1 },
      { text: "Consistent Brand Template", included: true, order: 2 },
      { text: "All Email Clients", included: true, order: 3 },
      { text: "Unlimited Revisions", included: true, order: 4 },
      { text: "Priority Support", included: true, order: 5 }
    ]
  }
];

const checkAndSeed = async () => {
    const count = await PricingPackage.countDocuments();
    if (count === 0) {
        await PricingPackage.insertMany(seedData);
    }
    const settingsCount = await PricingSettings.countDocuments();
    if (settingsCount === 0) {
        await PricingSettings.create({});
    }
};

// PUBLIC
exports.getPublicPricing = async (req, res) => {
    try {
        await checkAndSeed();
        const settings = await PricingSettings.findOne() || {};
        const packages = await PricingPackage.find({ isVisible: true }).sort({ sortOrder: 1 });
        
        const template = packages.filter(p => p.serviceType === 'template');
        const signature = packages.filter(p => p.serviceType === 'signature');
        
        res.json({
            settings,
            template,
            signature
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSettings = async (req, res) => {
    try {
        await checkAndSeed();
        const settings = await PricingSettings.findOne();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ADMIN
exports.getAllAdmin = async (req, res) => {
    try {
        await checkAndSeed();
        const packages = await PricingPackage.find().sort({ serviceType: 1, sortOrder: 1 });
        const settings = await PricingSettings.findOne();
        res.json({ packages, settings });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPackage = async (req, res) => {
    try {
        const newPkg = new PricingPackage(req.body);
        await newPkg.save();
        res.status(201).json(newPkg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const pkg = await PricingPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(pkg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        await PricingPackage.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.toggleVisibility = async (req, res) => {
    try {
        const pkg = await PricingPackage.findById(req.params.id);
        if (!pkg) return res.status(404).json({ error: 'Not found' });
        pkg.isVisible = !pkg.isVisible;
        await pkg.save();
        res.json(pkg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await PricingSettings.findOne();
        if (!settings) settings = new PricingSettings();
        
        Object.assign(settings, req.body);
        await settings.save();
        res.json(settings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.reorderPackages = async (req, res) => {
    try {
        const { orderedIds } = req.body;
        for (let i = 0; i < orderedIds.length; i++) {
            await PricingPackage.findByIdAndUpdate(orderedIds[i], { sortOrder: i + 1 });
        }
        res.json({ message: 'Reordered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
