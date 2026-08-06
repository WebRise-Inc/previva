import type { Locale } from "@/lib/site";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleContent = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  intro: string;
  sections: ArticleSection[];
  conclusion: string;
};

export type Article = {
  slug: string;
  image: string;
  publishedAt: string;
  content: Record<Locale, ArticleContent>;
};

export const articles: Article[] = [
  {
    slug: "lhorloge-tourne",
    image: "/images/planning.webp",
    publishedAt: "2025-11-06",
    content: {
      fr: {
        category: "Retraite",
        title: "L’horloge tourne — comment bien planifier sa retraite avant qu’il ne soit trop tard",
        excerpt: "Le temps est un levier puissant. Voyez comment transformer vos années de travail restantes en un plan de retraite clair et durable.",
        date: "6 novembre 2025",
        readTime: "6 min de lecture",
        intro: "La planification de la retraite est souvent remise à plus tard. Pourtant, chaque année de préparation influence le revenu disponible, la fiscalité et la tranquillité d’esprit dont vous profiterez au moment de ralentir.",
        sections: [
          { heading: "Commencer tôt : le pouvoir du temps", paragraphs: ["Plus une somme reste investie longtemps, plus la capitalisation peut travailler en votre faveur. De petites cotisations régulières commencées tôt peuvent produire davantage qu’un effort beaucoup plus important entrepris à l’approche de la retraite.", "L’objectif n’est pas de trouver le moment parfait, mais d’établir une cadence réaliste et de l’augmenter lorsque votre revenu le permet."], bullets: ["Automatiser une cotisation à chaque paie", "Réinvestir les remboursements d’impôt", "Réviser le montant après une hausse de salaire"] },
          { heading: "Évaluer vos besoins futurs", paragraphs: ["Un bon plan commence par une vision concrète de votre mode de vie. Séparez les dépenses essentielles des projets discrétionnaires, puis prévoyez une marge pour la santé, l’entretien du logement et les imprévus.", "Cette projection permet de fixer une cible de revenu et d’identifier l’écart entre vos ressources prévues et vos besoins."], bullets: ["Logement, alimentation et soins de santé", "Voyages, loisirs et soutien à la famille", "Dettes et obligations encore présentes à la retraite"] },
          { heading: "Connaître toutes vos sources de revenu", paragraphs: ["Le revenu de retraite provient généralement de plusieurs piliers : le RRQ, la Sécurité de la vieillesse, un régime d’employeur et votre épargne personnelle. Les REER, FERR, CELI, CRI, FRV et placements non enregistrés n’ont pas tous le même traitement fiscal.", "Comprendre comment ces revenus s’additionnent aide à choisir le bon moment pour demander les prestations publiques et commencer les retraits." ] },
          { heading: "Coordonner les retraits et l’impôt", paragraphs: ["La meilleure stratégie ne vise pas seulement le rendement. Elle tient aussi compte de l’impôt, des crédits et des prestations qui peuvent être réduites lorsque le revenu imposable augmente.", "Un plan de décaissement peut préciser quand convertir le REER en FERR, quels comptes utiliser en premier et comment coordonner le RRQ avec un régime d’employeur." ] },
          { heading: "Réviser le plan régulièrement", paragraphs: ["Votre salaire, vos projets, vos dettes et votre santé changent. Une révision annuelle permet d’actualiser les hypothèses, de corriger la trajectoire et de vérifier que vos protections demeurent adaptées."] },
        ],
        conclusion: "L’horloge tourne, mais chaque décision prise aujourd’hui peut renforcer votre sécurité future. Un portrait clair de vos besoins, de vos revenus et de votre fiscalité constitue le meilleur point de départ.",
      },
      en: {
        category: "Retirement",
        title: "The clock is ticking — how to plan your retirement before it is too late",
        excerpt: "Time is a powerful financial lever. Turn your remaining working years into a clear and sustainable retirement plan.",
        date: "November 6, 2025",
        readTime: "6 min read",
        intro: "Retirement planning is easy to postpone. Yet every year of preparation affects your future income, tax situation, and peace of mind when the time comes to slow down.",
        sections: [
          { heading: "Start early and let time work", paragraphs: ["The longer money remains invested, the more opportunity compounding has to work. Modest, regular contributions started early may accomplish more than a much larger effort begun close to retirement.", "The goal is not to find a perfect moment. It is to establish a realistic rhythm and increase it as your income grows."], bullets: ["Automate a contribution from every pay", "Reinvest tax refunds", "Review the amount after a salary increase"] },
          { heading: "Estimate your future needs", paragraphs: ["A useful plan begins with a practical picture of the life you want. Separate essential expenses from optional projects, then allow room for health care, home maintenance, and unexpected costs.", "This projection creates an income target and reveals the gap between your expected resources and your needs."], bullets: ["Housing, food, and health care", "Travel, leisure, and family support", "Debt and obligations that may remain in retirement"] },
          { heading: "Know every source of retirement income", paragraphs: ["Retirement income often comes from several pillars: QPP, Old Age Security, an employer plan, and personal savings. RRSPs, RRIFs, TFSAs, LIRAs, LIFs, and non-registered investments do not receive the same tax treatment.", "Understanding how those sources fit together helps you decide when to claim public benefits and begin withdrawals." ] },
          { heading: "Coordinate withdrawals and tax", paragraphs: ["A strong strategy considers more than investment returns. It also accounts for income tax, credits, and benefits that may be reduced as taxable income rises.", "A withdrawal plan can establish when to convert an RRSP to a RRIF, which accounts to use first, and how to coordinate QPP with an employer pension." ] },
          { heading: "Review the plan regularly", paragraphs: ["Income, projects, debt, and health all change. An annual review lets you refresh assumptions, correct course, and confirm that your insurance protection still fits your situation."] },
        ],
        conclusion: "The clock is moving, but every decision made today can strengthen your future security. A clear view of your needs, income sources, and tax position is the best place to begin.",
      },
    },
  },
  {
    slug: "lassurance-vie",
    image: "/images/insurance.webp",
    publishedAt: "2025-10-01",
    content: {
      fr: {
        category: "Assurance",
        title: "L’assurance vie : protéger vos proches et assurer la continuité de vos projets",
        excerpt: "Comprenez ce que l’assurance vie protège, les principales formes de couverture et les éléments à considérer pour déterminer vos besoins.",
        date: "1 octobre 2025",
        readTime: "7 min de lecture",
        intro: "L’assurance vie ne vise pas à enrichir une famille après un décès. Elle sert à préserver sa stabilité financière, à régler les obligations immédiates et à donner aux proches le temps de se réorganiser.",
        sections: [
          { heading: "Ce que l’assurance vie peut couvrir", paragraphs: ["Le capital versé au bénéficiaire peut remplacer un revenu, rembourser une hypothèque, régler des dettes et financer des dépenses futures. Il peut aussi servir à couvrir les frais funéraires ou les impôts associés au transfert de certains biens."], bullets: ["Hypothèque, loyer et dettes personnelles", "Maintien du niveau de vie de la famille", "Études des enfants et projets à long terme", "Frais finaux et planification successorale"] },
          { heading: "Assurance temporaire ou permanente", paragraphs: ["L’assurance temporaire offre une protection pendant une période déterminée, souvent de 10 à 40 ans. Son coût initial est généralement plus bas et elle convient bien aux besoins qui diminuent avec le temps, comme une hypothèque ou la présence d’enfants à charge.", "L’assurance permanente demeure en vigueur toute la vie, sous réserve du contrat et du paiement des primes. Certaines protections peuvent accumuler une valeur de rachat et soutenir une planification successorale ou fiscale plus complexe."] },
          { heading: "Évaluer le montant nécessaire", paragraphs: ["Aucune formule ne convient à tout le monde. Le calcul doit réunir le revenu à remplacer, les dettes, les dépenses futures, les actifs disponibles et les protections déjà en place.", "Une assurance collective fournie par l’employeur peut compléter le plan, mais elle est souvent limitée et peut disparaître lors d’un changement d’emploi."], bullets: ["Revenu et nombre d’années à remplacer", "Solde des dettes et de l’hypothèque", "Coût prévu des études et autres projets", "Épargne, placements et couvertures existantes"] },
          { heading: "Les erreurs fréquentes", paragraphs: ["Reporter la décision peut augmenter le coût de la protection et rendre l’admissibilité plus difficile si la santé change. Il faut aussi éviter de sous-estimer les besoins ou de compter uniquement sur la couverture de l’employeur.", "Le prix dépend notamment de l’âge, de la santé, des habitudes de vie, du montant assuré et du type de contrat." ] },
        ],
        conclusion: "Une protection adaptée crée de la marge de manœuvre dans une période difficile. Elle doit être révisée après un achat immobilier, une naissance, un changement d’emploi ou toute évolution importante de la situation familiale.",
      },
      en: {
        category: "Insurance",
        title: "Life insurance: protecting your loved ones and the continuity of your plans",
        excerpt: "Understand what life insurance protects, the main coverage types, and the factors that shape an appropriate amount.",
        date: "October 1, 2025",
        readTime: "7 min read",
        intro: "Life insurance is not intended to make a family wealthy after a death. It helps preserve financial stability, settle immediate obligations, and give loved ones time to reorganize.",
        sections: [
          { heading: "What life insurance can cover", paragraphs: ["The benefit paid to a beneficiary can replace income, repay a mortgage, settle debt, and fund future expenses. It may also cover final costs or taxes related to transferring certain assets."], bullets: ["Mortgage, rent, and personal debt", "The family’s standard of living", "Children’s education and long-term plans", "Final expenses and estate planning"] },
          { heading: "Term or permanent insurance", paragraphs: ["Term insurance provides protection for a defined period, often 10 to 40 years. Its initial cost is generally lower and it is well suited to needs that decrease over time, such as a mortgage or dependent children.", "Permanent insurance can remain in force for life, subject to the contract and premium payments. Some policies may accumulate cash value and support more advanced estate or tax planning."] },
          { heading: "Estimate the amount required", paragraphs: ["No single formula works for everyone. The calculation should bring together income replacement, debt, future expenses, available assets, and insurance already in place.", "Employer group insurance can supplement the plan, but it is often limited and may end when employment changes."], bullets: ["Income and the number of years to replace", "Mortgage and other debt balances", "Education costs and family plans", "Savings, investments, and existing coverage"] },
          { heading: "Common mistakes", paragraphs: ["Waiting may increase the cost and make approval more difficult if health changes. It is also important not to underestimate the need or rely exclusively on an employer plan.", "Pricing depends on factors such as age, health, lifestyle, coverage amount, and policy type." ] },
        ],
        conclusion: "Appropriate protection creates financial room during a difficult period. Review it after buying a home, having a child, changing jobs, or experiencing another meaningful family change.",
      },
    },
  },
  {
    slug: "taux-directeur-a-25",
    image: "/images/blog-tax.jpg",
    publishedAt: "2025-09-17",
    content: {
      fr: {
        category: "Économie",
        title: "La Banque du Canada abaisse son taux directeur à 2,5 % dans un contexte économique fragile",
        excerpt: "Retour sur la décision du 17 septembre 2025 et sur ce qu’une baisse du taux directeur peut signifier pour les ménages canadiens.",
        date: "17 septembre 2025",
        readTime: "5 min de lecture",
        intro: "Le 17 septembre 2025, la Banque du Canada a réduit son taux directeur de 25 points de base, le faisant passer de 2,75 % à 2,5 %. Cette décision reflétait un équilibre délicat entre une économie qui ralentissait et des pressions inflationnistes toujours surveillées.",
        sections: [
          { heading: "Pourquoi une baisse à ce moment-là?", paragraphs: ["La Banque estimait alors que les risques liés à la hausse des prix s’étaient atténués pendant que l’activité économique et le marché du travail perdaient de la vigueur. Une baisse visait à soutenir la demande sans relancer excessivement l’inflation.", "Les décisions de taux reposent sur plusieurs indicateurs : inflation fondamentale, emploi, croissance, commerce et attentes des ménages et des entreprises." ] },
          { heading: "Ce que cela peut changer pour les ménages", paragraphs: ["Une variation du taux directeur peut se transmettre aux taux variables, aux marges de crédit et, progressivement, à certaines offres hypothécaires. L’effet n’est toutefois ni instantané ni identique pour tous les produits."], bullets: ["Les paiements d’un prêt à taux variable peuvent diminuer", "Le renouvellement hypothécaire dépend encore du terme et du marché obligataire", "Le rendement des comptes d’épargne peut aussi reculer", "Un taux plus bas ne remplace pas une analyse de la capacité d’emprunt"] },
          { heading: "Une décision dans un contexte mondial", paragraphs: ["À cette date, les tensions commerciales et le ralentissement observé dans plusieurs économies ajoutaient de l’incertitude. Les exportations, l’investissement et la confiance des consommateurs demeuraient des éléments importants à suivre.", "Les marchés réévaluent constamment leurs attentes. Une annonce de la banque centrale ne garantit donc pas la direction des taux futurs." ] },
          { heading: "Comment réagir dans son propre plan", paragraphs: ["Il est généralement préférable d’éviter une décision précipitée fondée sur une seule annonce. Comparez le taux, la flexibilité du contrat, les pénalités, votre horizon et votre capacité à absorber une hausse éventuelle.", "Cet article décrit une décision historique de 2025. Vérifiez toujours les taux et conditions en vigueur avant d’agir." ] },
        ],
        conclusion: "Les taux influencent le coût du crédit et le rendement de l’épargne, mais ils ne sont qu’un élément du plan. Une stratégie solide demeure alignée sur votre budget, votre horizon et votre tolérance au risque.",
      },
      en: {
        category: "Economy",
        title: "Bank of Canada cuts its key rate to 2.5% amid economic headwinds",
        excerpt: "A look back at the September 17, 2025 decision and what a lower policy rate can mean for Canadian households.",
        date: "September 17, 2025",
        readTime: "5 min read",
        intro: "On September 17, 2025, the Bank of Canada lowered its policy rate by 25 basis points, from 2.75% to 2.5%. The decision reflected a delicate balance between a slowing economy and inflation pressures that still required attention.",
        sections: [
          { heading: "Why lower the rate at that time?", paragraphs: ["The Bank judged that upside inflation risks had eased while economic activity and the labour market were losing momentum. The reduction was intended to support demand without reigniting excessive inflation.", "Rate decisions draw on many indicators, including core inflation, employment, growth, trade, and household and business expectations." ] },
          { heading: "What it can mean for households", paragraphs: ["A policy-rate change can flow through to variable-rate loans, lines of credit, and eventually some mortgage offers. The effect is neither immediate nor identical across every product."], bullets: ["Payments on some variable-rate loans may decrease", "Mortgage renewal pricing still depends on the term and bond market", "Savings-account yields may also move lower", "A lower rate does not replace a borrowing-capacity review"] },
          { heading: "A decision shaped by the global economy", paragraphs: ["At the time, trade tensions and slowing growth in several economies added uncertainty. Exports, investment, and consumer confidence remained important signals to watch.", "Markets constantly revise their expectations, so one central-bank announcement does not guarantee the future direction of rates." ] },
          { heading: "How to respond in your own plan", paragraphs: ["Avoid making a rushed decision based on a single announcement. Compare the interest rate, contract flexibility, penalties, your timeline, and your ability to absorb a future increase.", "This article discusses a historical decision from 2025. Always confirm current rates and terms before acting." ] },
        ],
        conclusion: "Interest rates affect borrowing costs and savings returns, but they are only one part of a financial plan. A resilient strategy remains aligned with your budget, timeline, and risk tolerance.",
      },
    },
  },
  {
    slug: "reer-ou-celi",
    image: "/images/wealth.webp",
    publishedAt: "2025-09-04",
    content: {
      fr: {
        category: "Placements",
        title: "REER ou CELI : comment choisir la bonne stratégie pour vos objectifs",
        excerpt: "Deux comptes enregistrés, deux traitements fiscaux différents. Comparez-les selon votre revenu, votre horizon et vos projets.",
        date: "4 septembre 2025",
        readTime: "6 min de lecture",
        intro: "Le REER et le CELI permettent tous deux de faire croître l’épargne à l’abri de l’impôt pendant qu’elle demeure dans le compte. Leur différence principale se situe au moment où l’avantage fiscal est obtenu.",
        sections: [
          { heading: "Le REER : une déduction aujourd’hui", paragraphs: ["Une cotisation REER réduit généralement le revenu imposable de l’année. Les retraits seront toutefois imposables plus tard. Le REER peut donc être avantageux lorsque votre taux d’imposition actuel est plus élevé que celui prévu au retrait.", "Les droits inutilisés peuvent être conservés pour une année future où la déduction aura davantage de valeur." ] },
          { heading: "Le CELI : des retraits libres d’impôt", paragraphs: ["Une cotisation au CELI n’accorde pas de déduction, mais les retraits admissibles ne sont pas imposables. Le montant retiré s’ajoute de nouveau aux droits de cotisation l’année suivante.", "Cette flexibilité convient aux projets à court ou moyen terme, au fonds d’urgence et aux personnes qui souhaitent limiter leur revenu imposable à la retraite." ] },
          { heading: "Choisir selon votre situation", paragraphs: ["Le revenu, l’horizon et l’utilisation prévue de l’argent comptent davantage que le nom du compte. Une personne au revenu élevé peut privilégier le REER et réinvestir son remboursement dans un CELI. Une personne dont le revenu est plus modeste peut commencer par le CELI et conserver ses droits REER."], bullets: ["Comparez votre taux d’imposition actuel et futur", "Vérifiez si votre employeur offre une cotisation équivalente", "Tenez compte de l’effet des retraits sur les prestations", "Respectez vos droits de cotisation disponibles"] },
          { heading: "Souvent, la réponse est une combinaison", paragraphs: ["Le REER peut soutenir la retraite à long terme pendant que le CELI garde une réserve accessible pour les projets et les imprévus. Répartir l’épargne entre les deux crée davantage d’options au moment des retraits.", "Le CELIAPP peut également être pertinent pour une première propriété, selon l’admissibilité et les règles applicables." ] },
        ],
        conclusion: "Le bon choix dépend de votre réalité, et non d’une règle universelle. Une stratégie coordonnée entre REER, CELI et autres comptes peut améliorer à la fois l’efficacité fiscale et la flexibilité.",
      },
      en: {
        category: "Investments",
        title: "RRSP or TFSA: choosing the right strategy for your goals",
        excerpt: "Two registered accounts with different tax treatment. Compare them using your income, timeline, and intended use of the money.",
        date: "September 4, 2025",
        readTime: "6 min read",
        intro: "RRSPs and TFSAs both allow savings to grow tax-sheltered while the money remains in the account. The main difference is when you receive the tax benefit.",
        sections: [
          { heading: "The RRSP: a deduction today", paragraphs: ["An RRSP contribution generally reduces taxable income for the year, while future withdrawals are taxable. It may be especially useful when your current tax rate is higher than the rate you expect when withdrawing.", "Unused room can be carried forward to a future year when the deduction may be more valuable." ] },
          { heading: "The TFSA: tax-free withdrawals", paragraphs: ["A TFSA contribution does not provide a deduction, but eligible withdrawals are not taxable. The withdrawn amount is added back to contribution room the following year.", "This flexibility can suit short- and medium-term projects, emergency savings, and people who want to limit taxable retirement income." ] },
          { heading: "Choose according to your situation", paragraphs: ["Income, timeline, and the intended purpose matter more than the account name. A higher-income saver may prioritize the RRSP and invest the refund in a TFSA. Someone with more modest income may start with the TFSA and preserve RRSP room."], bullets: ["Compare your current and expected future tax rates", "Check for an employer contribution match", "Consider how withdrawals may affect benefits", "Stay within your available contribution room"] },
          { heading: "Often, the answer is a combination", paragraphs: ["The RRSP can support long-term retirement savings while the TFSA keeps funds accessible for projects and surprises. Using both creates more options when it is time to draw income.", "An FHSA may also be relevant for a qualifying first-home purchase, subject to eligibility and current rules." ] },
        ],
        conclusion: "The right choice depends on your circumstances, not a universal rule. Coordinating RRSPs, TFSAs, and other accounts can improve both tax efficiency and flexibility.",
      },
    },
  },
  {
    slug: "devenir-proprietaire",
    image: "/images/story-card.webp",
    publishedAt: "2025-09-04",
    content: {
      fr: {
        category: "Immobilier",
        title: "Transformer le rêve de devenir propriétaire en réalité",
        excerpt: "La mise de fonds n’est qu’une partie du projet. Voici comment préparer votre budget, votre crédit et les coûts qui entourent l’achat.",
        date: "4 septembre 2025",
        readTime: "6 min de lecture",
        intro: "L’achat d’une première propriété est un jalon important. La hausse des prix et le coût du financement peuvent sembler décourageants, mais un objectif clair et une préparation structurée rendent le projet plus concret.",
        sections: [
          { heading: "Définir la propriété recherchée", paragraphs: ["Un condo en ville, une maison en banlieue et un duplex ne demandent pas la même mise de fonds ni le même budget mensuel. Clarifier le secteur, le type de propriété et l’échéancier permet de bâtir une cible d’épargne réaliste.", "Prévoyez aussi une marge entre le prix maximal autorisé par le prêteur et le paiement que votre budget peut réellement soutenir." ] },
          { heading: "Créer de bonnes habitudes financières", paragraphs: ["La préparation ne se limite pas à accumuler une mise de fonds. Un budget régulier, une épargne automatisée et un fonds d’urgence démontrent que le futur paiement peut être absorbé sans fragiliser le reste du plan."], bullets: ["Automatiser l’épargne à chaque paie", "Réduire les dettes à taux élevé", "Suivre les dépenses discrétionnaires", "Conserver une réserve après l’achat"] },
          { heading: "Prévoir les coûts au-delà de la mise de fonds", paragraphs: ["Le notaire, l’inspection, les droits de mutation, le déménagement et l’ameublement s’ajoutent au prix d’achat. Une propriété exige aussi de l’entretien et peut demander des réparations imprévues.", "Isoler ces sommes de la mise de fonds évite d’arriver chez le notaire sans liquidités suffisantes." ] },
          { heading: "Comprendre le crédit et le financement", paragraphs: ["Un dossier de crédit solide peut faciliter l’approbation et améliorer les conditions offertes. Vérifiez les rapports de crédit, payez à temps et évitez d’augmenter fortement vos soldes avant une demande hypothécaire.", "Comparez le taux, le terme, les privilèges de remboursement, les pénalités et la différence entre taux fixe et variable." ] },
          { heading: "Intégrer la maison au plan global", paragraphs: ["Le paiement hypothécaire ne devrait pas empêcher l’épargne-retraite, les protections familiales ou la réalisation d’autres projets. La bonne propriété est celle qui s’intègre durablement à votre vie financière." ] },
        ],
        conclusion: "Devenir propriétaire se prépare bien avant la visite d’une maison. Une cible précise, un budget complet et une réserve adéquate transforment un projet intimidant en série d’étapes réalisables.",
      },
      en: {
        category: "Home ownership",
        title: "Turning the dream of home ownership into reality",
        excerpt: "The down payment is only one part of the project. Prepare your budget, credit, and the costs surrounding a purchase.",
        date: "September 4, 2025",
        readTime: "6 min read",
        intro: "Buying a first home is a major milestone. Higher prices and financing costs can feel discouraging, but a clear goal and structured preparation make the project more concrete.",
        sections: [
          { heading: "Define the property you want", paragraphs: ["A downtown condo, a suburban house, and a duplex require different down payments and monthly budgets. Clarifying the area, property type, and timeline creates a realistic savings target.", "Leave room between the maximum a lender may approve and the payment your budget can comfortably support." ] },
          { heading: "Build sound financial habits", paragraphs: ["Preparation involves more than accumulating a down payment. A working budget, automated savings, and an emergency fund show that the future payment can fit without weakening the rest of your plan."], bullets: ["Automate savings from every pay", "Reduce high-interest debt", "Track discretionary spending", "Keep a reserve after the purchase"] },
          { heading: "Plan beyond the down payment", paragraphs: ["Legal fees, inspection, land-transfer tax, moving, and furniture come on top of the purchase price. A home also requires maintenance and may bring unexpected repairs.", "Keeping these amounts separate from the down payment helps preserve liquidity at closing." ] },
          { heading: "Understand credit and financing", paragraphs: ["A strong credit history can support approval and better terms. Review credit reports, pay on time, and avoid sharply increasing balances before a mortgage application.", "Compare the rate, term, prepayment privileges, penalties, and the differences between fixed and variable rates." ] },
          { heading: "Fit the home into the whole plan", paragraphs: ["Mortgage payments should not eliminate retirement savings, family protection, or every other goal. The right property is one that fits sustainably within your financial life." ] },
        ],
        conclusion: "Home ownership begins well before a showing. A precise target, complete budget, and adequate reserve turn an intimidating goal into a series of manageable steps.",
      },
    },
  },
  {
    slug: "maladies-graves",
    image: "/images/blog-education.avif",
    publishedAt: "2025-09-03",
    content: {
      fr: {
        category: "Protection",
        title: "Se protéger contre les maladies graves : un choix financier essentiel",
        excerpt: "Un diagnostic peut bouleverser le revenu et le budget familial. Comprenez le rôle d’une assurance maladies graves dans votre plan.",
        date: "3 septembre 2025",
        readTime: "5 min de lecture",
        intro: "Une maladie grave touche d’abord la santé, mais ses conséquences financières peuvent aussi être importantes. Une période d’arrêt de travail, des soins non couverts ou l’aide nécessaire à la maison peuvent rapidement réduire l’épargne familiale.",
        sections: [
          { heading: "Les conséquences financières possibles", paragraphs: ["Les factures courantes continuent même lorsque le revenu diminue. Certaines familles utilisent alors leur fonds d’urgence, leurs placements ou leur crédit pour traverser la période de traitement et de rétablissement."], bullets: ["Perte ou réduction du revenu", "Médicaments, thérapies ou soins non couverts", "Transport et hébergement pour les traitements", "Aide à domicile ou adaptation du logement"] },
          { heading: "Le fonctionnement général de la protection", paragraphs: ["L’assurance maladies graves peut verser un montant forfaitaire lorsque les conditions prévues au contrat sont respectées. Le bénéficiaire choisit généralement comment utiliser cette somme : remplacer un revenu, payer des soins, réduire une dette ou protéger l’épargne à long terme.", "Les maladies couvertes, les définitions, le délai de survie, les exclusions et les options de remboursement varient d’un contrat à l’autre." ] },
          { heading: "Déterminer un montant pertinent", paragraphs: ["Le besoin peut être évalué à partir du revenu à remplacer, des dépenses mensuelles, de la durée probable d’un arrêt et des réserves déjà disponibles. Une personne autonome ou sans assurance invalidité collective peut avoir un risque différent de celui d’un salarié bien protégé.", "L’objectif consiste à créer suffisamment de marge pour se concentrer sur le rétablissement sans compromettre les projets futurs." ] },
          { heading: "Poser les bonnes questions", paragraphs: ["Avant de souscrire, vérifiez les définitions médicales, la durée de la protection, les primes, les possibilités de renouvellement et les exclusions. Une comparaison uniquement fondée sur le prix peut masquer des différences importantes."], bullets: ["Quelles maladies et interventions sont couvertes?", "Quels délais et critères s’appliquent?", "La prime est-elle garantie?", "Comment la protection s’agence-t-elle avec l’assurance invalidité?"] },
        ],
        conclusion: "Une assurance maladies graves ne prévient pas le diagnostic, mais elle peut limiter ses conséquences financières. La protection doit être choisie selon votre revenu, vos réserves, votre situation familiale et votre budget.",
      },
      en: {
        category: "Protection",
        title: "Protecting yourself against critical illness: an essential financial choice",
        excerpt: "A diagnosis can disrupt income and the family budget. Understand how critical illness insurance may fit within your plan.",
        date: "September 3, 2025",
        readTime: "5 min read",
        intro: "A critical illness affects health first, but the financial impact can also be significant. Time away from work, uncovered care, or support at home can quickly reduce family savings.",
        sections: [
          { heading: "Possible financial consequences", paragraphs: ["Regular bills continue even when income declines. Some families must use emergency savings, investments, or credit while treatment and recovery are underway."], bullets: ["Lost or reduced income", "Uncovered medication, therapy, or care", "Travel and accommodation for treatment", "Home support or accessibility changes"] },
          { heading: "How the coverage generally works", paragraphs: ["Critical illness insurance may pay a lump sum when the conditions in the policy are met. The recipient can generally decide how to use it: replace income, pay for care, reduce debt, or preserve long-term savings.", "Covered conditions, definitions, survival periods, exclusions, and return-of-premium options vary between contracts." ] },
          { heading: "Determine a suitable amount", paragraphs: ["The need can be estimated using income replacement, monthly expenses, the possible length of leave, and available reserves. A self-employed person or someone without group disability insurance may face a different risk than a well-protected employee.", "The objective is to create enough room to focus on recovery without sacrificing future plans." ] },
          { heading: "Ask the right questions", paragraphs: ["Before purchasing coverage, review the medical definitions, coverage period, premiums, renewability, and exclusions. Comparing price alone may hide meaningful differences."], bullets: ["Which illnesses and procedures are covered?", "What waiting periods and criteria apply?", "Are premiums guaranteed?", "How does the policy work alongside disability insurance?"] },
        ],
        conclusion: "Critical illness insurance cannot prevent a diagnosis, but it may limit the financial consequences. Coverage should reflect your income, reserves, family situation, and budget.",
      },
    },
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
