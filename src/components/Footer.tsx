export default function Footer({ dict }: { dict: any }) {
    return (
        <footer className="bg-korami-black py-12 border-t border-korami-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-korami-white/40 text-sm">
                <div className="mb-4 md:mb-0">
                    &copy; {dict.footer.copyright}
                </div>
                <div className="text-xs">
                    {dict.footer.builtWith}
                </div>
            </div>
        </footer>
    );
}
