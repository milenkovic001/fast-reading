import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Clock, Palette, Timer, Type } from 'lucide-react';
import { useTheme } from '../contexts/ThemeProvider';


const Navbar = ({ activeTimeOption, setActiveTimeOption }) => {
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

    const { selectedTheme, setSelectedTheme, selectedFont, setSelectedFont } = useTheme();

    const themeDropdownRef = useRef(null);
    const fontDropdownRef = useRef(null);

    const themes = [
        { name: 'Clean Light', themeName: 'clean-light', color: 'bg-white' },
        { name: 'Warm Light', themeName: 'warm-light', color: 'bg-yellow-200' },
        { name: 'Deep Dark', themeName: 'deep-dark', color: 'bg-gray-900' },
        { name: 'Slate Dark', themeName: 'slate-dark', color: 'bg-slate-800' }
    ];

    const fonts = [
        { name: 'Georgia', fontName: 'georgia', class: 'font-georgia' },
        { name: 'Inter', fontName: 'inter', class: 'font-[--font-inter]' },
        { name: 'Roboto', fontName: 'roboto', class: 'font-[--font-roboto]' },
        { name: 'Lato', fontName: 'lato', class: 'font-[--font-lato]' },
        { name: 'Montserrat', fontName: 'montserrat', class: 'font-[--font-montserrat]' },
        { name: 'Poppins', fontName: 'poppins', class: 'font-[--font-poppins]' },
        { name: 'Fira Code', fontName: 'fira Code', class: 'font-[--font-fira]' },
        { name: 'Arial', fontName: 'arial', class: 'font-arial' },
        { name: 'Sans', fontName: 'sans', class: 'font-sans' },
        { name: 'Serif', fontName: 'serif', class: 'font-serif' },
        { name: 'Mono', fontName: 'mono', class: 'font-mono' },
    ];

    const activityOptions = [
        { name: 'Time per Word', option: 'timePerWord', icon: <Clock size={16} /> },
        { name: 'Time per Letter', option: 'timePerLetter', icon:  <Timer size={16} />}
    ]


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
                setThemeDropdownOpen(false);
            }
            if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target)) {
                setFontDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleThemeSelect = (theme) => {
        setSelectedTheme(theme.themeName);
        setThemeDropdownOpen(false);
    };

    const handleFontSelect = (font) => {
        setSelectedFont(font.fontName);
        setFontDropdownOpen(false);
    };

    return (
        <nav className="h-16 bg-background  text-nav-text shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold ">FastReading</h1>
                    </div>


                    {/* Dropdown Menus */}
                    <div className="flex items-center space-x-4">

                        {/* Theme Dropdown */}
                        <div className="relative" ref={themeDropdownRef}>
                            <button
                                onClick={() => {
                                    setThemeDropdownOpen(!themeDropdownOpen);
                                    setFontDropdownOpen(false);
                                }}
                                className="flex items-center space-x-2 text-nav-text  hover:text-nav-text-hover  px-3 py-1 rounded-md text-lg font-medium transition-colors"
                            >
                                <Palette size={16} />
                                <span>Theme</span>
                                <ChevronDown
                                    size={16}
                                    className={`transform transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Theme Dropdown Menu */}
                            {themeDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-background rounded-md shadow-xl shadow-shadow  border border-border z-50">
                                    <div className="py-1">
                                        {themes.map((theme) => (
                                            <button
                                                key={theme.name}
                                                onClick={() => handleThemeSelect(theme)}
                                                className="flex items-center w-full px-4 py-2 text-sm  hover:bg-nav-box-hover transition-colors"
                                            >
                                                <div className={`w-4 h-4 rounded-full ${theme.color} border border-border mr-3`}></div>
                                                <span>{theme.name}</span>
                                                {selectedTheme === theme.themeName && (
                                                    <span className="ml-auto text-nav-box-check">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Font Dropdown */}
                        <div className="relative" ref={fontDropdownRef}>
                            <button
                                onClick={() => {
                                    setFontDropdownOpen(!fontDropdownOpen);
                                    setThemeDropdownOpen(false);
                                }}
                                className="flex items-center space-x-2 text-nav-text  hover:text-nav-text-hover  px-3 py-1 rounded-md text-lg font-medium transition-colors"

                            >
                                <Type size={16} />
                                <span>Font</span>
                                <ChevronDown
                                    size={16}
                                    className={`transform transition-transform duration-200 ${fontDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Font Dropdown Menu */}
                            {fontDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-background rounded-md shadow-xl shadow-shadow  border border-border z-50">
                                    <div className="py-1">
                                        {fonts.map((font) => (
                                            <button
                                                key={font.name}
                                                onClick={() => handleFontSelect(font)}
                                                className={`flex items-center w-full px-4 py-2 text-sm  text-nav-text hover:bg-nav-box-hover transition-colors ${font.class}`}
                                            >
                                                <span>{font.name}</span>
                                                {selectedFont === font.fontName && (
                                                    <span className="ml-auto text-nav-box-check">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {activityOptions.map((activityOption) => (
                            <div
                                className={`flex items-center space-x-2 select-none hover:text-nav-text-hover px-3 py-2 rounded-md text-lg font-medium transition-colors cursor-pointer
                            ${activeTimeOption === activityOption.option ? 'border bg-nav-bg-active border-border  text-nav-text-active' : 'text-nav-text'}
                            `}
                                onClick={() => setActiveTimeOption(activityOption.option)}
                            >
                                {activityOption.icon}
                                <span>{activityOption.name}</span>
                            </div>))}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;