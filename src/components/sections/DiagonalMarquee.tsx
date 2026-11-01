const message = "ISАHAK ALI — FULL STACK DEVELOPER — FREELANCER";

export default function DiagonalMarquee() {
    const items = Array.from({ length: 8 });

    return (
        <section className="diagonal-marquee">
            <div className="marquee-ribbon ribbon-one">
                <div className="marquee-track track-left">
                    {items.map((_, index) => (
                        <span key={index}>
                            {message} <b>✳</b>
                        </span>
                    ))}
                </div>
            </div>

            <div className="marquee-ribbon ribbon-two">
                <div className="marquee-track track-right">
                    {items.map((_, index) => (
                        <span key={index}>
                            {message} <b>✳</b>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}