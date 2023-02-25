import { XIcon, CheckCircleIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

function Notification({ title, message, type, show, onClose }) {
    const icon = {
        success: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
        warning: <ExclamationIcon className="w-6 h-6 text-yellow-400" />,
        error: <ExclamationIcon className="w-6 h-6 text-red-400" />,
        info: <InformationCircleIcon className="w-6 h-6 text-blue-400" />,
    }[type];

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg pointer-events-auto z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center">
                        {icon}
                        <div className="ml-3 font-medium">{title}</div>
                    </div>
                    <div className="flex-shrink-0 cursor-pointer" onClick={onClose}>
                        <XIcon className="w-6 h-6 text-gray-400" />
                    </div>
                </div>
                <div className="px-4 py-3">{message}</div>
            </div>
        </Transition>
    );
}

export default Notification;
