import { loadStripe } from "@stripe/stripe-js";


const getStripe = () => {
    let stripePromise;

    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51ODBTSCDDTyH4CHBu4ffLF4ldFcdWXh6YeNq5eQCVwpeIf1SeTzugLTys5PEo0PXRIEvkseOWsRIpWAsjS7LjpwK00iN6gZxTZ');

    }
    return stripePromise
}

export default getStripe;