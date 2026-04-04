import styles from "./Premium.module.css"; // Corrected import to .module.css

export default function Premium() {
    const plans = [
        {
            title: "QUARTERLY",
            price: 2000,
            duration: "3 Months",
            features: ["Standard Support", "Full Access Levels", "Weekly Updates", "Ai Assistance"],
            featured: false,
        },
        {
            title: "ANNUAL",
            price: 7500,
            duration: "1 Year",
            features: ["Standard Support", "Full Access Levels", "Weekly Updates", "Ai Assistance", "Priority Email Support"],
            featured: true,
        },
        {
            title: "SEMI-ANNUAL",
            price: 3750,
            duration: "6 Months",
            features: ["Standard Support", "Full Access Levels", "Weekly Updates", "Ai Assistance"],
            featured: false,
        },
    ];

    return (
        <div className={styles.container}>
            <header>
                <h1>To continue, please choose your plan</h1>
                <p>Select the duration that best fits your needs. No hidden fees.</p>
            </header>

            <div className={styles.pricingGrid}>
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`${styles.card} ${plan.featured ? styles.featured : ""}`}
                    >
                        {plan.featured && <div className={styles.bestValueBadge}>Best Value</div>}
                        <h2>{plan.title}</h2>
                        <div className={styles.price}>
                            Rs.{plan.price}<span>/ {plan.duration}</span>
                        </div>
                        <ul className={styles.features}>
                            {plan.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                        <button className={styles.btn}>GET STARTED</button>
                    </div>
                ))}
            </div>
        </div>
    );
}